# Email Testing Guide for RemoteOps

## 🚀 Quick Start

### 1. Visual Testing Dashboard
Navigate to: **http://localhost:3000/test-emails**

This dashboard allows you to:
- Send individual test emails
- Run automated scenarios
- View email delivery results
- Test the complete funnel flow

### 2. Required Setup

#### Environment Variables
Make sure these are set in your `.env` file:
```env
# Resend (Required)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Beehiiv (Optional - for automation)
BEEHIIV_API_KEY=xxxxxxxxxxxxx
BEEHIIV_PUBLICATION_ID=xxxxxxxxxxxxx
```

#### Database Tables
Run the migration to create email tracking tables:
```bash
# If using Supabase locally
npx supabase db push

# Or apply directly to production
# Copy contents of supabase/migrations/20250118_add_email_tracking.sql
# to Supabase SQL editor and run
```

## 📧 Email Types & Testing

### 1. Application Received Email
**When sent:** Immediately when user provides email in chat
**Test URL:** `/api/test-email?type=received&email=test@example.com`

```bash
curl "http://localhost:3000/api/test-email?type=received&email=your@email.com&name=John"
```

### 2. Application Approved Email
**When sent:** Admin approves via dashboard
**Test URL:** `/api/test-email?type=approved&email=test@example.com`

```bash
curl "http://localhost:3000/api/test-email?type=approved&email=your@email.com&name=John"
```

### 3. Application Rejected Email
**When sent:** Admin rejects application
**Test URL:** `/api/test-email?type=rejected&email=test@example.com`

```bash
curl "http://localhost:3000/api/test-email?type=rejected&email=your@email.com&name=John"
```

### 4. Payment Confirmation Email
**When sent:** After successful payment
**Test URL:** `/api/test-email?type=payment&email=test@example.com`

```bash
curl "http://localhost:3000/api/test-email?type=payment&email=your@email.com&name=John"
```

## 🧪 Test Scenarios

### Scenario 1: Happy Path
1. User submits application → Receives confirmation email
2. Admin approves → Receives approval email with calendar link
3. User pays → Receives payment confirmation
4. Beehiiv starts welcome sequence (Days 1, 3, 5, 7)

### Scenario 2: Rejection Flow
1. User submits application → Receives confirmation email
2. Admin rejects → Receives rejection email
3. Beehiiv adds to nurture sequence

### Scenario 3: Abandoned Application
1. User starts chat but doesn't provide email → No email
2. User provides email but doesn't complete → Receives confirmation
3. After 7 days → Beehiiv nurture sequence starts

## 🔍 Monitoring & Debugging

### Check Email Logs in Database
```sql
-- View all sent emails
SELECT * FROM email_logs ORDER BY created_at DESC;

-- Check specific user's emails
SELECT * FROM email_logs WHERE to_email = 'user@example.com';

-- View failed emails
SELECT * FROM email_logs WHERE status = 'failed';

-- Check email queue
SELECT * FROM email_queue WHERE status = 'pending';
```

### Verify Resend Delivery
1. Log into Resend dashboard: https://resend.com/emails
2. Check email status and delivery
3. View bounce/complaint rates

### Test Beehiiv Integration
```javascript
// Check if subscriber was added to Beehiiv
// GET https://api.beehiiv.com/v2/publications/{pub_id}/subscriptions?email=test@example.com

// Headers: Authorization: Bearer {BEEHIIV_API_KEY}
```

## 🛠️ Troubleshooting

### Email Not Sending
1. Check Resend API key is valid
2. Verify email domain is verified in Resend
3. Check console for error messages
4. Look at email_logs table for errors

### Beehiiv Not Syncing
1. Verify API key and publication ID
2. Check Beehiiv subscription status
3. Ensure email isn't already subscribed
4. Check console logs for API errors

### Database Issues
1. Ensure migrations are applied
2. Check RLS policies aren't blocking
3. Verify Supabase connection

## 📊 Testing Checklist

- [ ] Test individual email sends via dashboard
- [ ] Verify emails arrive with correct content
- [ ] Test application flow (chat → email trigger)
- [ ] Verify admin approval/rejection emails
- [ ] Check database logging works
- [ ] Test unsubscribe preferences
- [ ] Verify Beehiiv subscriber sync
- [ ] Test email open/click tracking
- [ ] Run full scenario tests
- [ ] Check error handling

## 🔗 Useful Links

- **Testing Dashboard:** http://localhost:3000/test-emails
- **Resend Dashboard:** https://resend.com/emails
- **Beehiiv Dashboard:** https://app.beehiiv.com
- **Supabase Dashboard:** https://app.supabase.com

## 📝 Notes

- Emails are sent immediately in development
- Use real email addresses for testing
- Check spam folder if emails don't arrive
- Resend has a rate limit of 100 emails/day on free tier
- Beehiiv automation flows need to be configured separately