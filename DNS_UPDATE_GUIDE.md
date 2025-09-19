# DNS Configuration Update Guide for RemoteOps.ai

## 🚨 IMMEDIATE ACTION REQUIRED

Your emails are currently going to spam because of an SPF record mismatch. This guide will fix it.

## Current Issue
- **Problem**: SPF record is set for Amazon SES but you're using Resend
- **Result**: Emails fail SPF authentication → Go to spam
- **Solution**: Update SPF record to authorize Resend

## DNS Records to Update

### 1. SPF Record (CRITICAL - UPDATE THIS)

| Field | Current (WRONG) | New (CORRECT) |
|-------|----------------|---------------|
| Type | TXT | TXT |
| Host | @ or blank | @ or blank |
| Value | `v=spf1 include:amazonses.com ~all` | `v=spf1 include:resend.net ~all` |
| TTL | Auto or 3600 | Auto or 3600 |

### 2. Existing Records (DO NOT CHANGE)
- **DKIM Records**: Already verified in Resend ✅
- **MX Records**: Keep as configured ✅
- **Other TXT Records**: Leave unchanged ✅

## Step-by-Step Instructions

### For Popular DNS Providers:

#### Cloudflare
1. Log into Cloudflare dashboard
2. Select your domain (remoteops.ai)
3. Go to DNS → Records
4. Find the TXT record with value starting with `v=spf1`
5. Click Edit
6. Change value to: `v=spf1 include:resend.net ~all`
7. Save

#### GoDaddy
1. Log into GoDaddy account
2. Go to Domain Settings → DNS
3. Find TXT record with SPF value
4. Edit → Change to: `v=spf1 include:resend.net ~all`
5. Save

#### Namecheap
1. Dashboard → Domain List → Manage
2. Advanced DNS tab
3. Find TXT record with SPF
4. Edit → Update value
5. Save changes

## Verification Steps

### 1. Wait for DNS Propagation (5-30 minutes typically)

### 2. Check SPF Record
```bash
# Run this command to verify the change:
dig TXT remoteops.ai | grep spf1

# Should show:
# v=spf1 include:resend.net ~all
```

### 3. Test Email Delivery
```bash
# Use the existing test script:
./test-real-email.sh

# Enter your email when prompted
# Check that email arrives in INBOX, not spam
```

### 4. Verify in Resend Dashboard
- Go to https://resend.com/domains
- Check remoteops.ai status remains "Verified"

## Important Notes

⚠️ **Only ONE SPF record allowed per domain**
- If you need multiple services, merge them:
  ```
  v=spf1 include:resend.net include:amazonses.com ~all
  ```

⚠️ **DNS Propagation Time**
- Changes typically take 5-30 minutes
- Maximum 48 hours globally

⚠️ **Don't Delete Other Records**
- Only modify the SPF TXT record
- Leave all other DNS records intact

## Troubleshooting

### If emails still go to spam after update:
1. Verify SPF record is exactly: `v=spf1 include:resend.net ~all`
2. Check no duplicate SPF records exist
3. Wait full 48 hours for global propagation
4. Contact Resend support with domain verification

### If Resend shows domain as "unverified":
1. Don't panic - this is temporary
2. Click "Verify DNS Records" in Resend dashboard
3. Wait 5 minutes and refresh

## Success Indicators
✅ Emails arrive in recipient's inbox  
✅ Resend dashboard shows domain as "Verified"  
✅ No SPF authentication failures in email headers  
✅ Test emails work consistently

## Need Help?
- Resend Support: support@resend.com
- Resend Docs: https://resend.com/docs
- Check DNS: https://mxtoolbox.com/spf.aspx

---
*Last Updated: 2025-09-14*  
*Issue: Emails going to spam due to SPF mismatch*  
*Solution: Update SPF from amazonses.com to resend.net*