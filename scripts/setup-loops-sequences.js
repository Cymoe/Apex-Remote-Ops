// Script to help set up Loops email sequences programmatically
// This shows how to structure your email automation in code

const emailSequences = {
  leadNurture: {
    name: 'Blueprint Lead Nurture',
    trigger: 'blueprint_lead_captured',
    emails: [
      {
        delay: 0, // Immediate
        subject: "You're almost there... (just need your blueprint)",
        previewText: "This is the exact system I used to scale to $40k/month",
        content: `
Hey there,

I noticed you're interested in building your own remote operations business - that's exactly where I was 2 years ago.

Back then, I was stuck in the corporate grind, dreaming of freedom but not knowing where to start.

Fast forward to today: I'm running a $40k/month remote ops business with just 4 clients, working from wherever I want.

The difference? I discovered a systematic approach that nobody talks about.

I've documented everything in a 90-minute walkthrough video - the exact blueprint I used to:
- Land my first $10k/month client in 6 weeks
- Build systems that run themselves
- Scale to $40k/month while working less

Ready to see behind the curtain?

[Get the Blueprint →] https://www.remoteops.ai/checkout

Talk soon,
Myles

P.S. This isn't theory - it's the actual playbook I use every day. No fluff, just what works.
        `
      },
      {
        delay: 1, // 1 day
        subject: "The $40k/month screenshot that changed everything",
        previewText: "Here's the proof (and how you can do it too)",
        content: `
Quick story...

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

[Get instant access here →] https://www.remoteops.ai/checkout

-Myles

P.S. One of my students just landed their first $8k/month client using this exact system. Your turn?
        `
      },
      {
        delay: 2, // 2 days
        subject: "Why most people fail at remote work (harsh truth)",
        previewText: "It's not what you think...",
        content: `
Real talk:

90% of people who try to build a remote business fail.

Not because they're not smart enough.
Not because they don't work hard enough.

They fail because they're following the wrong playbook.

They're:
- Competing on price instead of value
- Chasing small projects instead of retainers
- Trying to be everything to everyone
- Building a freelance job, not a business

I made all these mistakes too. Wasted 6 months spinning my wheels.

Then I discovered the Remote Ops model - and everything clicked.

Instead of fighting for $50/hour gigs, I started landing $10k/month retainers.
Instead of constant client hunting, I built long-term partnerships.
Instead of trading time for money, I built systems that scale.

The blueprint video shows you this entire model in detail.

Not interested in theory - just want the proven system?

[Get it here →] https://www.remoteops.ai/checkout

Here to help,
Myles

P.S. The biggest misconception? You need years of experience. I started with zero ops background. The system is what matters.
        `
      },
      {
        delay: 4, // 4 days
        subject: "From corporate VP to... unemployed",
        previewText: "The wake-up call that changed my life",
        content: `
Two years ago, I was a VP at a tech company.

Great title. Good salary. Zero fulfillment.

Then the company did a "restructuring" (corporate speak for layoffs).

Just like that - unemployed.

At first, I was devastated. Then I realized: this was my chance.

Instead of jumping back into another soul-crushing corporate role, I decided to bet on myself.

Started with one client. Then two. Then four.

Now? I make more than my VP salary working with just those 4 clients.

But here's what really matters:
- I work from anywhere (currently in Bali)
- I choose my hours
- I only work with people I respect
- I'm building something I own

The Remote Ops model gave me this freedom. And it can give you the same.

I've put everything I learned into that blueprint video - every strategy, every template, every lesson learned the hard way.

If you're ready to stop building someone else's dream and start building your own...

[This is your blueprint →] https://www.remoteops.ai/checkout

To your freedom,
Myles

P.S. That "restructuring"? Best thing that ever happened to me. Sometimes the push we need comes disguised as a setback.
        `
      },
      {
        delay: 7, // 7 days
        subject: "Closing the door on the Blueprint",
        previewText: "Last chance to get the $40k/month system",
        content: `
Hey - quick heads up.

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
- Build a location-independent business
- Work with high-value clients (not penny-pinchers)
- Create systems that scale
- Actually own your time

Then grab the blueprint now:

[Get instant access →] https://www.remoteops.ai/checkout

No more emails about this after today. You're either in or you're out.

To building something real,
Myles

P.S. One blueprint buyer just sent me a screenshot - closed their first $12k/month client last week. The system works if you work it.
        `
      }
    ]
  },
  
  customerOnboarding: {
    name: 'Blueprint Customer Onboarding',
    trigger: 'purchase_completed',
    emails: [
      {
        delay: 0, // Immediate
        subject: "Your Blueprint access is ready! 🎯",
        previewText: "Here's everything you need to get started",
        content: `
Welcome to Remote Ops!

Your blueprint access is confirmed and ready.

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

P.S. Check out our private community where other Remote Ops builders share wins and get help: [Join Here]
        `
      }
    ]
  }
};

console.log('Loops Email Sequences Configuration');
console.log('=====================================\n');

console.log('To set up these sequences in Loops:');
console.log('1. Go to your Loops dashboard');
console.log('2. Create a new Loop for each sequence');
console.log('3. Set the trigger event as specified');
console.log('4. Add each email with the specified delay');
console.log('5. Use the content provided as templates\n');

console.log('Trigger Events to Configure:');
console.log('- blueprint_lead_captured: Triggered when someone signs up');
console.log('- purchase_completed: Triggered when someone buys\n');

console.log('API Integration Points:');
console.log('- Lead Capture: /api/capture-lead (calls loops.startLeadNurture)');
console.log('- Purchase Success: /checkout/success (calls loops.markAsCustomer)\n');

console.log('Email Sequence Details:');
console.log(JSON.stringify(emailSequences, null, 2));

// You can also use this to automatically create sequences via Loops API
// when they add that functionality to their API