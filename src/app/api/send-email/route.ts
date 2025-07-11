import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { QualifiedLeadEmail } from '@/emails/qualified-lead';
import { NotQualifiedEmail } from '@/emails/not-qualified';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, name, score, type } = await req.json();

    if (!email || !name || score === undefined || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let emailResponse;

    if (type === 'qualified') {
      // Send qualified email with calendar link
      const calendarLink = process.env.NEXT_PUBLIC_CALENDAR_LINK || 'https://calendly.com/apex-operations/discovery';
      
      emailResponse = await resend.emails.send({
        from: 'APEX Operations <apex@remoteops.ai>',
        to: email,
        subject: 'Congratulations - You\'ve Been Selected for APEX Operations',
        react: QualifiedLeadEmail({ name, score, calendarLink }),
      });
    } else {
      // Send not qualified email
      emailResponse = await resend.emails.send({
        from: 'APEX Operations <apex@remoteops.ai>',
        to: email,
        subject: 'Thank You for Your Interest in APEX Operations',
        react: NotQualifiedEmail({ name, score }),
      });
    }

    return NextResponse.json({ success: true, data: emailResponse });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}