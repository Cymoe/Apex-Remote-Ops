import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendSimpleEmail(to: string, firstName: string) {
  try {
    const result = await resend.emails.send({
      from: 'Sarah <sarah@remoteops.ai>',
      to,
      subject: `Re: Your question about APEX`,
      replyTo: 'sarah@remoteops.ai',
      headers: {
        'X-Priority': '1',
        'Importance': 'high',
      },
      text: `Hey ${firstName},

Just saw your application come through - perfect timing actually!

We just had someone drop out of the Phoenix territory (family emergency), so there's an unexpected opening.

Want to jump on a quick call tomorrow? I can explain how everything works and see if it's a good fit.

What time works for you?

Sarah
Remote Ops Team
P.S. My calendar is pretty packed next week, so tomorrow would be ideal if you're available.`,
      html: `<p>Hey ${firstName},</p>
<p>Just saw your application come through - perfect timing actually!</p>
<p>We just had someone drop out of the Phoenix territory (family emergency), so there's an unexpected opening.</p>
<p>Want to jump on a quick call tomorrow? I can explain how everything works and see if it's a good fit.</p>
<p>What time works for you?</p>
<p>Sarah<br>Remote Ops Team</p>
<p>P.S. My calendar is pretty packed next week, so tomorrow would be ideal if you're available.</p>`,
    });

    console.log('Simple email sent:', result);
    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error('Failed to send simple email:', error);
    return { success: false, error };
  }
}