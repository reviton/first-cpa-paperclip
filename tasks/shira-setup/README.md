# הקמת שירה — סוכנת קשרי לקוחות

## מה זה התיקייה הזו

חבילת הקמה מלאה להפעלת **שירה קשר** (`agent-client-relations`) כסוכנת קשרי לקוחות אמיתית שעונה על מיילים נכנסים.

ארכיטקטורה: **Make.com + Anthropic Claude Haiku 4.5 + Supabase + Frontend הקיים**

---

## תגליות מרכזיות מהבדיקה (16/05/2026)

1. **כל הסוכנים בקוד הם stubs.** `agent-ceo`, `agent-hr`, `shared` מכילים רק טיפוסים — אין קריאות LLM, אין ביצוע.
2. **שירה כבר מוגדרת כ-metadata** ב-`frontend/src/data/agents.ts:76-87` (id: `agent-client-relations`), אבל לא מחוברת לשום דבר.
3. **ה-Knowledge Base הקיים hardcoded ב-TypeScript** (`frontend/src/data/knowledgeBase.ts`) — לא יושב ב-Supabase. בנוסף, הוא דשבורד אבחון פנימי על המשרד (התפלגות עומס, נקודות כאב) — **לא מאגר תשובות ללקוחות**.
4. **`first_crm_data` הוא טבלה אחת** עם `(entity, id, data jsonb, updated_at)`. אין צורך במיגרציה — נוסיף entity חדש `shiraDrafts` באותו pattern קיים.
5. **יש כבר Type `ApprovalRequest`** ב-`frontend/src/types` עם `id, taskId, requestedBy, approvedBy, status, reason, createdAt`. נרחיב אותו עבור שירה.

---

## הקבצים בתיקייה

| קובץ | למה משמש |
|------|-----------|
| `faq-starter.md` | טבלה ל-Google Sheets — 18 שאלות נפוצות במשרד רו"ח עם תשובות מוצעות. מה לערוך לפני העלאה. |
| `system-prompt.md` | System Prompt מוקשח של שירה, עם variables ש-Make.com מזין. |
| `supabase-schema.md` | מבנה ה-entity `shiraDrafts` ב-`first_crm_data` + דוגמת JSON payload + Supabase REST examples. |
| `make-scenario.md` | מדריך צעד-צעד לבניית Scenario ב-Make.com. |

---

## רצף ההפעלה (מסונכרן עם plan)

### יום 0 — אתה (חיצוני)
1. הירשם ב-[console.anthropic.com](https://console.anthropic.com) → הפק API key → שמור.
2. הירשם ב-[make.com](https://make.com) (Free tier).
3. ודא ש-Gmail המקושר הוא Google Workspace (חשבון First CPA).

### יום 1 — אתה (עריכת תוכן)
4. עבור על `faq-starter.md` — ערוך 18 השאלות לפי המדיניות האמיתית של המשרד (במיוחד מחירים, מועדים, ופרטים ספציפיים).
5. העתק לגיליון Google Sheets חדש בשם `Shira FAQ`. שיתוף לקריאה ל-Make.com.

### יום 2 — שנינו ביחד
6. נריץ ב-Supabase SQL editor את הקטע מ-`supabase-schema.md` (בדיקה ודוגמא).
7. תפתח את Make.com → תעקוב אחרי `make-scenario.md` שלב אחר שלב.

### יום 3 — מבחן ראשון
8. שלח לעצמך מייל בדיקה עם תווית "שירה" → תראה שטיוטה נוצרה.
9. נבדוק יחד את האיכות ונתקן את ה-System Prompt.

### יום 4-5 — עדכון UI הקיים
10. אכתוב לך עדכון ל-`ApprovalsPage.tsx` שיציג טיוטות אמיתיות (במקום "אין נתונים אמיתיים עדיין").

### יום 6-7 — ריצה מבוקרת
11. אתה מתייג ידנית 5-10 מיילים יומיים → שירה מכינה טיוטות → אתה מאשר/עורך/דוחה ב-`/approvals`.

---

## עלות צפויה לחודש הראשון

| רכיב | עלות |
|------|------|
| Anthropic API (Claude Haiku 4.5 — ~300 הודעות) | $3-8 |
| Make.com Free (עד 1,000 פעולות) | $0 |
| Supabase (קיים, Free tier) | $0 |
| **סה"כ** | **$3-8** |
