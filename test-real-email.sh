#!/bin/bash

echo "🔧 Testing Email Delivery with remoteops.ai domain"
echo "=================================================="
echo ""
read -p "Enter YOUR email address to test: " email

if [ -z "$email" ]; then
    echo "❌ No email provided"
    exit 1
fi

echo ""
echo "📧 Sending test email to: $email"
echo ""

response=$(curl -s "http://localhost:3000/api/test-email?type=received&email=$email&name=Test")

if echo "$response" | grep -q '"success":true'; then
    echo "✅ Email sent successfully!"
    echo ""
    echo "📬 Check your inbox (and spam folder) for:"
    echo "   From: APEX Operations <noreply@remoteops.ai>"
    echo "   Subject: Application Received - APEX Operator License"
    echo ""
    echo "Response: $response"
else
    echo "❌ Failed to send email"
    echo "Response: $response"
fi

echo ""
echo "💡 If you don't receive the email:"
echo "   1. Check your spam/junk folder"
echo "   2. Make sure your Resend API key is correct in .env"
echo "   3. Check Resend dashboard: https://resend.com/emails"