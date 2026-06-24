# Make.com Scenario — שירה Gmail Flow

מדריך צעד-צעד לבניית התרחיש הראשון של שירה. מבוסס על Make.com Free tier.

## המבנה הסופי

```
[1. Gmail: Watch Emails] (תווית "שירה")
    ↓
[2. Google Sheets: Search Rows] (FAQ lookup)
    ↓
[3. Anthropic Claude: Create a Prompt]
    ↓
[4. Gmail: Create a Draft]
    ↓
[5. HTTP: POST to Supabase] (log to first_crm_data)
```

5 מודולים. בערך 5 פעולות לכל מייל נכנס.

---

## הכנות לפני בנייה

- [ ] חשבון Make.com פעיל
- [ ] Anthropic API key מוכן
- [ ] גיליון `Shira FAQ` ב-Google Sheets מאוכלס (לפי `faq-starter.md`)
- [ ] תווית בשם "שירה" קיימת ב-Gmail (Settings → Labels → Create new label)
- [ ] Supabase URL + anon key — תיקח מ-[frontend/.env](C:\Users\User\Projects\first-cpa-organization\src\frontend\.env)

---

## שלב 1 — צור Scenario חדש

1. ב-Make.com → לחץ `Create a new scenario`.
2. שם: `Shira - Gmail Customer Support`.
3. נשמור אותו ריק לעת עתה.

---

## שלב 2 — מודול 1: Gmail Watch Emails

1. לחץ על העיגול הגדול במרכז → חפש `Gmail` → בחר `Watch Emails`.
2. חבר את חשבון Gmail של המשרד (OAuth — Make יפתח חלון Google).
3. הגדרות:
   - **Folder:** `INBOX`
   - **Criteria:** `Read emails — All emails`
   - **Filter by label:** `שירה` (התווית שיצרת)
   - **Max emails:** `5` (לא יותר בשבוע הראשון!)
   - **Mark messages as read:** `No` (אנחנו רוצים שיישארו לא נקראים עד שאתה עוצב טיוטה)
4. ⚠️ **חשוב:** ב-Set up trigger → בחר `Choose where to start` → `From now on` (לא לעבד מיילים ישנים).
5. שמור.

**בדיקה:** שלח לעצמך מייל לאחר התווית "שירה" → לחץ `Run once` במודול → אמור להופיע output עם השדות `from`, `subject`, `textBody` וכו'.

---

## שלב 3 — מודול 2: Google Sheets Search Rows

1. הוסף מודול חדש אחרי Gmail → חפש `Google Sheets` → בחר `Search Rows`.
2. חבר חשבון Google → בחר את `Shira FAQ` Spreadsheet.
3. הגדרות:
   - **Sheet:** `Sheet1` (או השם שנתת)
   - **Filter:** `column 'active' equals 'yes'`
   - **Maximum number of returned rows:** `1`
   - **Row order:** `relevance`
4. ב-Filter המתקדם הוסף תנאי נוסף — חשוב:
   - **column 'trigger_keywords' contains** → `{{1.textBody}}`

⚠️ **הגבלה של Make.com Free:** `contains` הוא literal — לא יודע לחפש "אחת מהמילים". פתרון: או לעבור ל-Make.com Pro ולהשתמש ב-regex, או לבנות לולאת `Iterator` שמפצלת את `trigger_keywords` ובודקת התאמה לכל מילה.

**פתרון פשוט יותר לשבוע 1:** אל תבסס יותר מדי על ה-FAQ — תן ל-Claude לראות את כל ה-FAQ במלואו. כלומר:
- שנה ל-`Search Rows` → לא לסנן לפי `contains`. רק `active=yes`.
- **Maximum rows:** `30`.
- כל ה-FAQ ייכנס ל-System Prompt → Claude יבחר לבד את הרלוונטי.

זה משלם בעוד מספר tokens ל-API אבל הרבה יותר אמין.

---

## שלב 4 — מודול 3: Anthropic Claude

1. הוסף מודול → חפש `Anthropic Claude` → בחר `Create a Prompt`.
2. חבר ב-API key (מ-console.anthropic.com).
3. הגדרות:
   - **Model:** `claude-haiku-4-5`
   - **Max tokens:** `500`
   - **Temperature:** `0.3`
4. **System Prompt:** העתק את התוכן המלא מ-[system-prompt.md](system-prompt.md).
5. החלף את ה-variables במפות (Mappings) מ-Make:
   - `{{FAQ_MATCH}}` → צור map שמרכז את כל שורות Sheets שחזרו: לדוגמא `{{join(map(2.rows; "trigger_keywords -> answer"); "\n")}}` (Make Pro) או פשוט הצמד את כל השורות אחת אחרי השנייה.
   - `{{CHANNEL}}` → `email`
   - `{{RECEIVED_AT}}` → `{{1.date}}`
   - `{{CUSTOMER_NAME}}` → `{{1.from.name}}`
   - `{{CUSTOMER_MESSAGE}}` → `{{1.textBody}}`
6. **User message:** השאר ריק (כל ההקשר ב-System).
7. שמור.

**בדיקה:** Run once → אמור להחזיר completion עם תגובת שירה.

---

## שלב 5 — מודול 4: Gmail Create a Draft

1. הוסף מודול → Gmail → `Create a Draft`.
2. הגדרות:
   - **To:** `{{1.from.email}}`
   - **Subject:** `Re: {{1.subject}}`
   - **In Reply To:** `{{1.messageId}}` (חשוב — שתשובת שירה תהיה Thread נכון)
   - **Content type:** `Plain text`
   - **Body:**
     ```
     {{3.completion}}
     
     —
     שירה
     שירות לקוחות, First CPA
     ```
3. שמור.

---

## שלב 6 — מודול 5: HTTP POST to Supabase

1. הוסף מודול → חפש `HTTP` → בחר `Make a request`.
2. הגדרות:
   - **URL:** `https://zxrcfjgncptgzgoxxobt.supabase.co/rest/v1/first_crm_data`
   - **Method:** `POST`
   - **Headers:**
     - `apikey`: [Supabase anon key מ-frontend/.env]
     - `Authorization`: `Bearer [אותו anon key]`
     - `Content-Type`: `application/json`
     - `Prefer`: `return=minimal`
   - **Body type:** `Raw`
   - **Content type:** `application/json`
   - **Request content:**
     ```json
     {
       "entity": "shiraDrafts",
       "id": "shira-draft-{{1.messageId}}",
       "data": {
         "id": "shira-draft-{{1.messageId}}",
         "channel": "email",
         "received_at": "{{1.date}}",
         "from_email": "{{1.from.email}}",
         "from_name": "{{1.from.name}}",
         "subject": "{{1.subject}}",
         "original_message": "{{1.textBody}}",
         "draft_response": "{{3.completion}}",
         "model_used": "claude-haiku-4-5",
         "status": "pending_review",
         "gmail_thread_id": "{{1.threadId}}",
         "gmail_draft_id": "{{4.id}}"
       },
       "updated_at": "{{now}}"
     }
     ```
3. שמור.

---

## שלב 7 — Schedule

1. בתחתית המסך → לחץ על `Every 15 minutes` (clock icon).
2. שנה ל-`On demand` בשבוע הראשון. אתה מפעיל ידנית.
3. בהמשך תהפוך ל-`Every 15 minutes` או יותר תכוף.

---

## שלב 8 — הפעלה ראשונה

1. שלח לעצמך מייל מחשבון חיצוני → כותרת: "בדיקת שירה" → גוף: "מה שעות הפעילות?"
2. **תייג** אותו בתווית "שירה" בתיבה (אחרי שהגיע).
3. ב-Make.com לחץ `Run once`.
4. צפה ב-execution log — כל הצעדים אמורים להיות ירוקים.
5. בדוק ב-Gmail Drafts → אמורה להיות שם טיוטה.
6. בדוק ב-Supabase SQL: `SELECT * FROM first_crm_data WHERE entity='shiraDrafts';` — אמורה להיות שורה.

---

## חסימות נפוצות + פתרונות

| שגיאה | סיבה | פתרון |
|---------|------|---------|
| Gmail trigger לא רואה מיילים | התווית לא קיימת או לא חלה | בדוק ב-Gmail שהתווית מוצמדת. תזכור — Filter by label רגיש לשמות עברית. |
| Anthropic 401 | API key שגוי | בדוק שהעתקת את כל ה-key (`sk-ant-...`) בלי רווחים |
| Anthropic 429 | rate limit | Free tier — 5 בקשות לדקה. הפחת `Max emails` במודול 1. |
| Supabase 401 | anon key שגוי | קח מ-`frontend/.env` → `REACT_APP_SUPABASE_ANON_KEY`. ללא BOM, ללא רווחים. |
| Supabase 403 / RLS | policies חוסמים INSERT | ראה `supabase-schema.md` → סעיף RLS |
| Make.com out of operations | חרגת מ-1000/חודש | שדרג ל-Core ($9) או בלום את הריצה |

---

## מה הלאה (שבוע 2+)

אחרי שגיים יציב:

1. **WhatsApp Business Cloud** — הוסף Trigger נוסף + Router שמפצל Gmail vs WhatsApp.
2. **Auto-send אחרי אישור** — שלב נוסף ב-Make ש-poll את `shiraDrafts` ומשגר את הטיוטה שעברה ל-`status='approved_sent'`.
3. **Internal notes from Supabase** — לתת לשירה גישה לשם הלקוח, סטטוס, הערות → תשובה מותאמת ויותר אישית.
