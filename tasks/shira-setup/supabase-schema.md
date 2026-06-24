# Supabase Schema — Shira Drafts

## הגישה: שימוש חוזר בטבלה הקיימת `first_crm_data`

הטבלה הקיימת:
```sql
first_crm_data (
  entity   TEXT NOT NULL,    -- 'clients' | 'jobs' | 'tasks' | ... | 'shiraDrafts'
  id       TEXT NOT NULL,
  data     JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (entity, id)
)
```

**אין צורך במיגרציה** — נשתמש ב-entity חדש `shiraDrafts`. זה matches את ה-pattern הקיים (`agentActivity`, `clients`, `jobs` וכו' — כולם באותה טבלה).

יתרון: ה-`fetchEntity()` הקיים ב-[firstCrmTools.ts:13-31](C:\Users\User\Projects\first-cpa-organization\src\frontend\src\api\firstCrmTools.ts#L13-L31) כבר יודע לקרוא — אין שינוי בקוד frontend מעבר ל-`ApprovalsPage.tsx`.

---

## מבנה ה-payload ב-`data` (JSON)

```json
{
  "id": "shira-draft-2026-05-16-001",
  "channel": "email",
  "received_at": "2026-05-16T09:23:11Z",
  "from_email": "yossi.cohen@example.co.il",
  "from_name": "יוסי כהן",
  "subject": "שאלה לגבי דיווח חודשי",
  "original_message": "היי, רציתי לדעת מתי בדיוק שולחים לי את החומרים החודשיים...",
  "draft_response": "אנו שולחים תזכורות להעברת חומרים חודשיים בין ה-1-5 לכל חודש...",
  "faq_match_id": "faq-row-7",
  "model_used": "claude-haiku-4-5",
  "status": "pending_review",
  "gmail_thread_id": "abc123def456",
  "gmail_draft_id": "draft-xyz789",
  "approved_at": null,
  "approved_by": null,
  "sent_at": null,
  "rejected_reason": null
}
```

### שדות status אפשריים

| status | משמעות |
|---------|---------|
| `pending_review` | שירה הכינה טיוטה, מחכה לאישור אנושי |
| `approved_sent` | אושר ונשלח דרך Gmail |
| `approved_edited` | אושר אחרי עריכה ונשלח |
| `rejected` | נדחה (סיבה ב-`rejected_reason`) |
| `escalated` | הפנייה אנושית — מישהו מהמשרד טיפל ידנית |

---

## דוגמא לקריאה מ-Make.com

### INSERT (אחרי שClaude מחזירה טיוטה)

```http
POST https://zxrcfjgncptgzgoxxobt.supabase.co/rest/v1/first_crm_data
Headers:
  apikey: {{SUPABASE_ANON_KEY}}
  Authorization: Bearer {{SUPABASE_ANON_KEY}}
  Content-Type: application/json
  Prefer: return=minimal

Body:
{
  "entity": "shiraDrafts",
  "id": "shira-draft-2026-05-16-001",
  "data": {
    "id": "shira-draft-2026-05-16-001",
    "channel": "email",
    "received_at": "2026-05-16T09:23:11Z",
    "from_email": "{{1.from.email}}",
    "from_name": "{{1.from.name}}",
    "subject": "{{1.subject}}",
    "original_message": "{{1.textBody}}",
    "draft_response": "{{3.completion}}",
    "faq_match_id": "{{2.id}}",
    "model_used": "claude-haiku-4-5",
    "status": "pending_review",
    "gmail_thread_id": "{{1.threadId}}",
    "gmail_draft_id": "{{4.draftId}}"
  },
  "updated_at": "{{now}}"
}
```

### UPDATE (כשמשתמש לוחץ "אשר ושלח" בדשבורד)

זה יקרה ב-frontend, לא ב-Make.com. הקוד הקיים `firstCrmTools.ts` כבר תומך — `update_task` עושה בדיוק את זה ל-tasks; נצטרך לחקות לעבור על shiraDrafts.

---

## RLS — האם נדרש?

הזיכרון אומר שיש RLS על `first_crm_data` (RLS-protected, anon key returns 0 rows). שני מצבים אפשריים:

### מצב A: RLS חוסם כתיבה מ-Make.com
אם Make.com לא יכול לכתוב עם anon key → צריך policy חדש או להשתמש ב-service role key.

**ה-policy המומלץ:**
```sql
-- Allow Make.com (using a dedicated service-role key) to insert shira drafts
-- This requires creating a separate Supabase API key with restricted role, OR using
-- service_role key directly in Make (with care).

CREATE POLICY "shira_drafts_insert"
ON first_crm_data FOR INSERT
TO anon
WITH CHECK (entity = 'shiraDrafts');

CREATE POLICY "shira_drafts_select_authenticated"
ON first_crm_data FOR SELECT
TO authenticated
USING (entity = 'shiraDrafts');
```

### מצב B: RLS מאפשר כתיבה anon
אם הקונפיגורציה הנוכחית כבר מאפשרת כתיבה (כי `agentActivity` כבר נכתב מ-frontend עם anon key) → לא צריך לעשות כלום. נבדוק ב-יום 2.

---

## בדיקה אחרי יום 1 (לפני שעוברים ל-Make)

לרוץ ב-Supabase SQL Editor:

```sql
-- 1. בדיקה שה-entity הקיימים תקינים
SELECT entity, count(*) as count
FROM first_crm_data
GROUP BY entity
ORDER BY count DESC;

-- 2. דוגמא של agentActivity (כדי לראות אם anon כותב לזה)
SELECT id, data->>'tool' as tool, data->>'agentId' as agent, updated_at
FROM first_crm_data
WHERE entity = 'agentActivity'
ORDER BY updated_at DESC
LIMIT 5;

-- 3. INSERT ידני של שורת שירה לבדיקה — תוודא שעובד
INSERT INTO first_crm_data (entity, id, data, updated_at)
VALUES (
  'shiraDrafts',
  'shira-test-001',
  '{"id":"shira-test-001","channel":"email","from_email":"test@example.com","original_message":"בדיקה","draft_response":"בדיקה הצליחה","status":"pending_review"}'::jsonb,
  now()
);

-- 4. תוודא שהוא נכתב
SELECT * FROM first_crm_data WHERE entity = 'shiraDrafts';

-- 5. ניקוי הבדיקה
DELETE FROM first_crm_data WHERE entity = 'shiraDrafts' AND id = 'shira-test-001';
```

אם שלב 3 נכשל עם error של RLS → נכין policy. אם עבר → אנחנו ירוקים.
