// All email templates managed in code
// Deploy to Loops via API - no UI needed

export const emailTemplates = {
  // Lead Nurture Sequence
  leadNurture: {
    sequence: [
      {
        id: 'lead_email_1',
        delay: 0, // Immediate
        subject: "You're almost there... (just need your blueprint)",
        previewText: "This is the exact system I used to scale to $40k/month",
        from: 'Myles Cameron <myles@remoteops.ai>',
        replyTo: 'myles@remoteops.ai',
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: white; padding: 30px; border-radius: 10px;">
    <p>Hey {{firstName | there}},</p>
    
    <p>I noticed you're interested in building your own remote operations business - that's exactly where I was 2 years ago.</p>
    
    <p>Back then, I was stuck in the corporate grind, dreaming of freedom but not knowing where to start.</p>
    
    <p><strong>Fast forward to today:</strong> I'm running a $40k/month remote ops business with just 4 clients, working from wherever I want.</p>
    
    <p>The difference? I discovered a systematic approach that nobody talks about.</p>
    
    <p>I've documented everything in a 90-minute walkthrough video - the exact blueprint I used to:</p>
    <ul>
      <li>Land my first $10k/month client in 6 weeks</li>
      <li>Build systems that run themselves</li>
      <li>Scale to $40k/month while working less</li>
    </ul>
    
    <p>Ready to see behind the curtain?</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://www.remoteops.ai/checkout" style="background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: 600;">Get the Blueprint →</a>
    </div>
    
    <p>Talk soon,<br>Myles</p>
    
    <p style="color: #666; font-size: 14px;">P.S. This isn't theory - it's the actual playbook I use every day. No fluff, just what works.</p>
  </div>
</body>
</html>`,
        text: `Hey {{firstName | there}},

I noticed you're interested in building your own remote operations business - that's exactly where I was 2 years ago.

Back then, I was stuck in the corporate grind, dreaming of freedom but not knowing where to start.

Fast forward to today: I'm running a $40k/month remote ops business with just 4 clients, working from wherever I want.

The difference? I discovered a systematic approach that nobody talks about.

I've documented everything in a 90-minute walkthrough video - the exact blueprint I used to:
- Land my first $10k/month client in 6 weeks
- Build systems that run themselves
- Scale to $40k/month while working less

Ready to see behind the curtain?

Get the Blueprint → https://www.remoteops.ai/checkout

Talk soon,
Myles

P.S. This isn't theory - it's the actual playbook I use every day. No fluff, just what works.`
      },
      {
        id: 'lead_email_2',
        delay: 86400000, // 1 day in ms
        subject: "The $40k/month screenshot that changed everything",
        previewText: "Here's the proof (and how you can do it too)",
        from: 'Myles Cameron <myles@remoteops.ai>',
        replyTo: 'myles@remoteops.ai',
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: white; padding: 30px; border-radius: 10px;">
    <p>Quick story...</p>
    
    <p>Last month, I screenshot my Stripe dashboard showing $40,000 in recurring revenue.</p>
    
    <p>Not to brag, but to prove a point:</p>
    
    <p style="background: #f3f4f6; padding: 15px; border-radius: 5px;">
      You don't need 100 clients to build a great business.<br>
      You don't need a team.<br>
      You don't need years of experience.
    </p>
    
    <p><strong>I have just 4 clients. That's it.</strong></p>
    
    <p>Each one pays $10k/month because I deliver results that are worth 10x that to their business.</p>
    
    <p>The blueprint video I mentioned yesterday? It shows you exactly how to:</p>
    <ul>
      <li>Position yourself as a $10k/month operator (not a $500 freelancer)</li>
      <li>Find companies that desperately need what you offer</li>
      <li>Close deals without being "salesy"</li>
    </ul>
    
    <p>If you're serious about building your own remote ops business, this is your roadmap.</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://www.remoteops.ai/checkout" style="background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: 600;">Get instant access here →</a>
    </div>
    
    <p>-Myles</p>
    
    <p style="color: #666; font-size: 14px;">P.S. One of my students just landed their first $8k/month client using this exact system. Your turn?</p>
  </div>
</body>
</html>`,
        text: `Quick story...

Last month, I screenshot my Stripe dashboard showing $40,000 in recurring revenue.

Not to brag, but to prove a point:

You don't need 100 clients to build a great business.
You don't need a team.
You don't need years of experience.

I have just 4 clients. That's it.

Each one pays $10k/month because I deliver results that are worth 10x that to their business.

The blueprint video I mentioned yesterday? It shows you exactly how to:
- Position yourself as a $10k/month operator (not a $500 freelancer)
- Find companies that desperately need what you offer
- Close deals without being "salesy"

If you're serious about building your own remote ops business, this is your roadmap.

Get instant access here → https://www.remoteops.ai/checkout

-Myles

P.S. One of my students just landed their first $8k/month client using this exact system. Your turn?`
      },
      {
        id: 'lead_email_3',
        delay: 172800000, // 2 days in ms
        subject: "Why most people fail at remote work (harsh truth)",
        previewText: "It's not what you think...",
        from: 'Myles Cameron <myles@remoteops.ai>',
        replyTo: 'myles@remoteops.ai',
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: white; padding: 30px; border-radius: 10px;">
    <p>Real talk:</p>
    
    <p><strong>90% of people who try to build a remote business fail.</strong></p>
    
    <p>Not because they're not smart enough.<br>
    Not because they don't work hard enough.</p>
    
    <p>They fail because they're following the wrong playbook.</p>
    
    <p style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0;">
      They're:<br>
      • Competing on price instead of value<br>
      • Chasing small projects instead of retainers<br>
      • Trying to be everything to everyone<br>
      • Building a freelance job, not a business
    </p>
    
    <p>I made all these mistakes too. Wasted 6 months spinning my wheels.</p>
    
    <p>Then I discovered the Remote Ops model - and everything clicked.</p>
    
    <p>Instead of fighting for $50/hour gigs, I started landing $10k/month retainers.<br>
    Instead of constant client hunting, I built long-term partnerships.<br>
    Instead of trading time for money, I built systems that scale.</p>
    
    <p>The blueprint video shows you this entire model in detail.</p>
    
    <p>Not interested in theory - just want the proven system?</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://www.remoteops.ai/checkout" style="background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: 600;">Get it here →</a>
    </div>
    
    <p>Here to help,<br>Myles</p>
    
    <p style="color: #666; font-size: 14px;">P.S. The biggest misconception? You need years of experience. I started with zero ops background. The system is what matters.</p>
  </div>
</body>
</html>`,
        text: `Real talk:

90% of people who try to build a remote business fail.

Not because they're not smart enough.
Not because they don't work hard enough.

They fail because they're following the wrong playbook.

They're:
• Competing on price instead of value
• Chasing small projects instead of retainers
• Trying to be everything to everyone
• Building a freelance job, not a business

I made all these mistakes too. Wasted 6 months spinning my wheels.

Then I discovered the Remote Ops model - and everything clicked.

Instead of fighting for $50/hour gigs, I started landing $10k/month retainers.
Instead of constant client hunting, I built long-term partnerships.
Instead of trading time for money, I built systems that scale.

The blueprint video shows you this entire model in detail.

Not interested in theory - just want the proven system?

Get it here → https://www.remoteops.ai/checkout

Here to help,
Myles

P.S. The biggest misconception? You need years of experience. I started with zero ops background. The system is what matters.`
      },
      {
        id: 'lead_email_4',
        delay: 345600000, // 4 days in ms
        subject: "From corporate VP to... unemployed",
        previewText: "The wake-up call that changed my life",
        from: 'Myles Cameron <myles@remoteops.ai>',
        replyTo: 'myles@remoteops.ai',
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: white; padding: 30px; border-radius: 10px;">
    <p>Two years ago, I was a VP at a tech company.</p>
    
    <p>Great title. Good salary. Zero fulfillment.</p>
    
    <p>Then the company did a "restructuring" (corporate speak for layoffs).</p>
    
    <p><strong>Just like that - unemployed.</strong></p>
    
    <p>At first, I was devastated. Then I realized: this was my chance.</p>
    
    <p>Instead of jumping back into another soul-crushing corporate role, I decided to bet on myself.</p>
    
    <p>Started with one client. Then two. Then four.</p>
    
    <p>Now? I make more than my VP salary working with just those 4 clients.</p>
    
    <p style="background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0;">
      But here's what really matters:<br>
      • I work from anywhere (currently in Bali)<br>
      • I choose my hours<br>
      • I only work with people I respect<br>
      • I'm building something I own
    </p>
    
    <p>The Remote Ops model gave me this freedom. And it can give you the same.</p>
    
    <p>I've put everything I learned into that blueprint video - every strategy, every template, every lesson learned the hard way.</p>
    
    <p>If you're ready to stop building someone else's dream and start building your own...</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://www.remoteops.ai/checkout" style="background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: 600;">This is your blueprint →</a>
    </div>
    
    <p>To your freedom,<br>Myles</p>
    
    <p style="color: #666; font-size: 14px;">P.S. That "restructuring"? Best thing that ever happened to me. Sometimes the push we need comes disguised as a setback.</p>
  </div>
</body>
</html>`,
        text: `Two years ago, I was a VP at a tech company.

Great title. Good salary. Zero fulfillment.

Then the company did a "restructuring" (corporate speak for layoffs).

Just like that - unemployed.

At first, I was devastated. Then I realized: this was my chance.

Instead of jumping back into another soul-crushing corporate role, I decided to bet on myself.

Started with one client. Then two. Then four.

Now? I make more than my VP salary working with just those 4 clients.

But here's what really matters:
• I work from anywhere (currently in Bali)
• I choose my hours
• I only work with people I respect
• I'm building something I own

The Remote Ops model gave me this freedom. And it can give you the same.

I've put everything I learned into that blueprint video - every strategy, every template, every lesson learned the hard way.

If you're ready to stop building someone else's dream and start building your own...

This is your blueprint → https://www.remoteops.ai/checkout

To your freedom,
Myles

P.S. That "restructuring"? Best thing that ever happened to me. Sometimes the push we need comes disguised as a setback.`
      },
      {
        id: 'lead_email_5',
        delay: 604800000, // 7 days in ms
        subject: "Closing the door on the Blueprint",
        previewText: "Last chance to get the $40k/month system",
        from: 'Myles Cameron <myles@remoteops.ai>',
        replyTo: 'myles@remoteops.ai',
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: white; padding: 30px; border-radius: 10px;">
    <p>Hey - quick heads up.</p>
    
    <p>I've been sharing my Remote Ops blueprint with you this week.</p>
    
    <p>The exact system I used to build a $40k/month business with just 4 clients.</p>
    
    <p>Several people have already grabbed it and started implementing.</p>
    
    <p style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
      <strong>But here's the thing:</strong><br><br>
      I'm going to be raising the price soon. The current price of $497 is honestly too low for what's inside.<br><br>
      My students are landing $8k, $10k, even $15k/month clients with this system.<br><br>
      The ROI is ridiculous.
    </p>
    
    <p>So if you've been on the fence, this is your last chance at the current price.</p>
    
    <p>After this weekend, it goes up to $997.</p>
    
    <p>If you want to:<br>
    • Build a location-independent business<br>
    • Work with high-value clients (not penny-pinchers)<br>
    • Create systems that scale<br>
    • Actually own your time</p>
    
    <p>Then grab the blueprint now:</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://www.remoteops.ai/checkout" style="background: #ef4444; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: 600;">Get instant access →</a>
    </div>
    
    <p>No more emails about this after today. You're either in or you're out.</p>
    
    <p>To building something real,<br>Myles</p>
    
    <p style="color: #666; font-size: 14px;">P.S. One blueprint buyer just sent me a screenshot - closed their first $12k/month client last week. The system works if you work it.</p>
  </div>
</body>
</html>`,
        text: `Hey - quick heads up.

I've been sharing my Remote Ops blueprint with you this week.

The exact system I used to build a $40k/month business with just 4 clients.

Several people have already grabbed it and started implementing.

But here's the thing:

I'm going to be raising the price soon. The current price of $497 is honestly too low for what's inside.

My students are landing $8k, $10k, even $15k/month clients with this system.

The ROI is ridiculous.

So if you've been on the fence, this is your last chance at the current price.

After this weekend, it goes up to $997.

If you want to:
• Build a location-independent business
• Work with high-value clients (not penny-pinchers)
• Create systems that scale
• Actually own your time

Then grab the blueprint now:

Get instant access → https://www.remoteops.ai/checkout

No more emails about this after today. You're either in or you're out.

To building something real,
Myles

P.S. One blueprint buyer just sent me a screenshot - closed their first $12k/month client last week. The system works if you work it.`
      }
    ]
  },
  
  // Customer Onboarding
  customerOnboarding: {
    sequence: [
      {
        id: 'customer_welcome',
        delay: 0, // Immediate
        subject: "Your Blueprint access is ready! 🎯",
        previewText: "Here's everything you need to get started",
        from: 'Myles Cameron <myles@remoteops.ai>',
        replyTo: 'myles@remoteops.ai',
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: white; padding: 30px; border-radius: 10px;">
    <h2 style="color: #3b82f6; margin-bottom: 20px;">Welcome to Remote Ops!</h2>
    
    <p>{{firstName}}, your blueprint access is confirmed and ready.</p>
    
    <p><strong>Here's how to get started:</strong></p>
    
    <ol style="line-height: 2;">
      <li>Set aside 90 minutes for the walkthrough video</li>
      <li>Have a notebook ready (you'll want to take notes)</li>
      <li>Download the templates as you go through each section</li>
    </ol>
    
    <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0;"><strong>💡 Quick tip:</strong> Don't try to consume everything at once. Watch the first 30 minutes, implement what you learn, then continue.</p>
    </div>
    
    <p>The students who get the best results are the ones who take action immediately.</p>
    
    <p>You've got this!</p>
    
    <p>If you have any questions, just reply to this email.</p>
    
    <p>Welcome to the team,<br>Myles</p>
    
    <p style="color: #666; font-size: 14px;">P.S. Check out our private community where other Remote Ops builders share wins and get help: [Join Here]</p>
  </div>
</body>
</html>`,
        text: `Welcome to Remote Ops!

{{firstName}}, your blueprint access is confirmed and ready.

Here's how to get started:

1. Set aside 90 minutes for the walkthrough video
2. Have a notebook ready (you'll want to take notes)
3. Download the templates as you go through each section

Quick tip: Don't try to consume everything at once. Watch the first 30 minutes, implement what you learn, then continue.

The students who get the best results are the ones who take action immediately.

You've got this!

If you have any questions, just reply to this email.

Welcome to the team,
Myles

P.S. Check out our private community where other Remote Ops builders share wins and get help: [Join Here]`
      }
    ]
  }
};


// Function to get email by ID
export function getEmailTemplate(sequenceName: string, emailId: string) {
  const sequence = emailTemplates[sequenceName as keyof typeof emailTemplates];
  if (!sequence) return null;
  
  return sequence.sequence.find(email => email.id === emailId);
}

// Function to get entire sequence
export function getEmailSequence(sequenceName: string) {
  return emailTemplates[sequenceName as keyof typeof emailTemplates];
}