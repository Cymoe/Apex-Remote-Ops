import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';

interface BaseEmailProps {
  firstName?: string;
  email: string;
}

interface ApplicationReceivedProps extends BaseEmailProps {
  applicationId: string;
}

interface ApplicationApprovedProps extends BaseEmailProps {
  calendarLink: string;
  territory: string;
}

interface ApplicationRejectedProps extends BaseEmailProps {
  reason?: string;
}

interface WelcomeSequenceProps extends BaseEmailProps {
  dayNumber: number;
}

interface NurtureSequenceProps extends BaseEmailProps {
  contentType: 'case_study' | 'testimonial' | 'faq' | 'urgency';
}

const baseStyles = {
  main: {
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  },
  container: {
    margin: '0 auto',
    padding: '20px 0 48px',
    width: '580px',
  },
  heading: {
    fontSize: '24px',
    letterSpacing: '-0.5px',
    lineHeight: '1.3',
    fontWeight: '700',
    color: '#111827',
    padding: '17px 0 0',
  },
  paragraph: {
    margin: '0 0 15px',
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#374151',
  },
  button: {
    backgroundColor: '#111827',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '12px 20px',
    margin: '20px 0',
  },
  hr: {
    borderColor: '#e6e6e6',
    margin: '42px 0 26px',
  },
};

// 1. Application Received - Immediate
export const ApplicationReceivedEmail = ({
  firstName = 'there',
  applicationId,
}: ApplicationReceivedProps) => (
  <Html>
    <Head />
    <Preview>Your APEX Operator License application has been received</Preview>
    <Body style={baseStyles.main}>
      <Container style={baseStyles.container}>
        <Heading style={baseStyles.heading}>
          Application Received, {firstName}!
        </Heading>
        <Text style={baseStyles.paragraph}>
          Your application for an APEX Operator License has been received and is being reviewed.
        </Text>
        <Text style={baseStyles.paragraph}>
          <strong>What happens next:</strong>
        </Text>
        <Text style={baseStyles.paragraph}>
          • Our team will review your application within 24 hours<br />
          • If approved, you'll receive a calendar link to book your onboarding call<br />
          • You'll get exclusive access to your territory before anyone else
        </Text>
        <Text style={baseStyles.paragraph}>
          Application ID: {applicationId}
        </Text>
        <Hr style={baseStyles.hr} />
        <Text style={baseStyles.paragraph}>
          While you wait, watch this 5-minute video from our top operator Marcel who went from $0 to $67K/month in 8 months:
        </Text>
        <Button
          style={baseStyles.button}
          href="https://remoteops.ai/case-study/marcel"
        >
          Watch Marcel's Story →
        </Button>
      </Container>
    </Body>
  </Html>
);

// 2. Application Approved
export const ApplicationApprovedEmail = ({
  firstName = 'there',
  calendarLink,
  territory,
}: ApplicationApprovedProps) => (
  <Html>
    <Head />
    <Preview>Congratulations! Your territory {territory} has been reserved</Preview>
    <Body style={baseStyles.main}>
      <Container style={baseStyles.container}>
        <Heading style={baseStyles.heading}>
          🎉 Congratulations {firstName}! You're Approved!
        </Heading>
        <Text style={baseStyles.paragraph}>
          Great news! Your application has been approved and we've reserved <strong>{territory}</strong> exclusively for you.
        </Text>
        <Text style={baseStyles.paragraph}>
          <strong>Your next step is critical:</strong> Book your onboarding call within the next 48 hours to secure your territory.
        </Text>
        <Button
          style={baseStyles.button}
          href={calendarLink}
        >
          Book Your Onboarding Call Now →
        </Button>
        <Text style={baseStyles.paragraph}>
          On this 30-minute call, we'll:
        </Text>
        <Text style={baseStyles.paragraph}>
          • Finalize your territory boundaries<br />
          • Review the 30-day launch roadmap<br />
          • Get you access to the operator portal<br />
          • Answer any questions about getting started
        </Text>
        <Text style={{ ...baseStyles.paragraph, fontWeight: 'bold', color: '#dc2626' }}>
          ⚠️ Important: Your territory reservation expires in 48 hours if not confirmed.
        </Text>
      </Container>
    </Body>
  </Html>
);

// 3. Application Rejected
export const ApplicationRejectedEmail = ({
  firstName = 'there',
  reason = 'Your application did not meet our current requirements',
}: ApplicationRejectedProps) => (
  <Html>
    <Head />
    <Preview>Update on your APEX Operator License application</Preview>
    <Body style={baseStyles.main}>
      <Container style={baseStyles.container}>
        <Heading style={baseStyles.heading}>
          Hi {firstName},
        </Heading>
        <Text style={baseStyles.paragraph}>
          Thank you for your interest in the APEX Operator License program.
        </Text>
        <Text style={baseStyles.paragraph}>
          After careful review, we've determined that your application doesn't align with our current operator profile. {reason}.
        </Text>
        <Text style={baseStyles.paragraph}>
          This doesn't mean never - it means not right now. We encourage you to:
        </Text>
        <Text style={baseStyles.paragraph}>
          • Gain more business experience<br />
          • Build up your capital reserves<br />
          • Reapply in 6 months
        </Text>
        <Text style={baseStyles.paragraph}>
          In the meantime, here's a free resource that might help:
        </Text>
        <Button
          style={baseStyles.button}
          href="https://remoteops.ai/free-guide"
        >
          Download: 10 Steps to Remote Operations →
        </Button>
      </Container>
    </Body>
  </Html>
);

// 4. Welcome Sequence (Day 1, 3, 5, 7)
export const WelcomeSequenceEmail = ({
  firstName = 'there',
  dayNumber,
}: WelcomeSequenceProps) => {
  const content: Record<number, {subject: string; preview: string; heading: string; body: string; cta: string; ctaLink: string}> = {
    1: {
      subject: 'Your 30-Day Roadmap (Start Here)',
      preview: 'Everything you need to launch your remote operation',
      heading: 'Welcome to APEX, {firstName}!',
      body: `Your operator portal is now active. Here's your first week checklist:

Day 1-3: Set up your business structure
Day 4-5: Hire your first crew
Day 6-7: Launch your first marketing campaign

Access your complete 30-day roadmap in the portal.`,
      cta: 'Access Your Portal',
      ctaLink: 'https://remoteops.ai/portal',
    },
    3: {
      subject: 'Case Study: $0 to $32K in 5 months',
      preview: 'How Sarah built her painting business',
      heading: 'Sarah\'s Story: From Corporate to $32K/month',
      body: `Sarah was laid off from tech in March. By August, she was doing $32K/month with 2 painting crews in Dallas.

Her secret? She followed the system exactly:
• Week 1: Set up LLC and insurance
• Week 2: Hired first crew using our scripts
• Week 3: Launched Google Ads
• Month 2: Hit $10K
• Month 5: Scaled to $32K

Watch her full interview (22 minutes).`,
      cta: 'Watch Sarah\'s Interview',
      ctaLink: 'https://remoteops.ai/sarah-interview',
    },
    5: {
      subject: 'Your crews are waiting (proven hiring scripts inside)',
      preview: 'Copy these exact scripts to hire crews this week',
      heading: 'Ready to Hire Your First Crew?',
      body: `Most operators overthink hiring. Here\'s the truth: experienced crews are actively looking for reliable operators like you.

We\'ve included:
• Word-for-word hiring posts
• Interview questions that filter quality
• Trial job templates
• Payment structures that motivate

One operator hired 3 crews in his first week using these exact scripts.`,
      cta: 'Get the Hiring Scripts',
      ctaLink: 'https://remoteops.ai/portal/hiring',
    },
    7: {
      subject: 'Limited: Join our next Operator Mastermind',
      preview: 'Thursday 2pm EST - Live with 6-figure operators',
      heading: 'You\'re Invited: Live Operator Mastermind',
      body: `This Thursday at 2pm EST, join our monthly mastermind with:

• Marcel ($67K/month) - Phoenix
• Sarah ($32K/month) - Dallas  
• Mike ($28K/month) - Atlanta
• You and 12 other new operators

We\'ll cover:
• Q4 strategies for max revenue
• Holiday season preparation
• Live Q&A on any challenges

Spots are limited to keep it intimate.`,
      cta: 'Reserve Your Spot',
      ctaLink: 'https://remoteops.ai/mastermind',
    },
  };

  const selectedContent = content[dayNumber] || content[1];

  return (
    <Html>
      <Head />
      <Preview>{selectedContent.preview}</Preview>
      <Body style={baseStyles.main}>
        <Container style={baseStyles.container}>
          <Heading style={baseStyles.heading}>
            {selectedContent.heading.replace('{firstName}', firstName)}
          </Heading>
          <Text style={baseStyles.paragraph}>
            {selectedContent.body}
          </Text>
          <Button
            style={baseStyles.button}
            href={selectedContent.ctaLink}
          >
            {selectedContent.cta} →
          </Button>
        </Container>
      </Body>
    </Html>
  );
};

// 5. Nurture Sequence for Non-Converters
export const NurtureSequenceEmail = ({
  firstName = 'there',
  contentType,
}: NurtureSequenceProps) => {
  const content = {
    case_study: {
      subject: 'He thought it was too good to be true (now does $67K/month)',
      preview: 'Marcel almost didn\'t apply...',
      body: `Marcel was skeptical. A painting business run from his laptop? It sounded like BS.

8 months later, he\'s doing $67K/month with 3 crews in Phoenix.

"I almost didn\'t apply because it seemed too good to be true. Thank God I did. I quit my job 4 months ago and haven\'t looked back."

Watch his full story (no opt-in required).`,
      cta: 'Watch Marcel\'s Story',
      ctaLink: 'https://remoteops.ai/marcel-story',
    },
    testimonial: {
      subject: 'Why contractors are leaving their jobs for this',
      preview: 'Average income: $42K/month after 6 months',
      body: `Our last 10 operators are averaging $42K/month after 6 months. Here\'s why they made the switch:

"I was tired of bidding against 20 other contractors for every job. Now I have exclusive territory rights." - James, Houston

"The systems are plug-and-play. I was operational in 3 weeks." - Maria, Austin

"Best investment I\'ve ever made. ROI in month 2." - David, Nashville

Only 2 spots left for Q4.`,
      cta: 'Check Territory Availability',
      ctaLink: 'https://remoteops.ai/apply',
    },
    faq: {
      subject: 'Your top questions answered',
      preview: 'Do I need experience? How fast can I start?',
      body: `I get these questions daily:

Q: Do I need contracting experience?
A: No. You hire experienced crews. You run the business.

Q: How quickly can I realistically start making money?
A: Most operators get their first job in week 3-4. Average $10K/month by day 90.

Q: What if my territory is taken?
A: Each metro has multiple territories. If Dallas is taken, you might get Plano or Fort Worth.

Q: Why don\'t you just do this yourself?
A: I do. But the market is massive. There\'s $400B in renovation work annually.`,
      cta: 'See All FAQs',
      ctaLink: 'https://remoteops.ai/faq',
    },
    urgency: {
      subject: 'Final notice: {territory} territory closing tomorrow',
      preview: 'Someone else is interested in your area',
      body: `I wanted to give you a final heads up - we have another applicant interested in your territory.

If you\'re still interested in securing exclusive rights to your area, you need to complete your application by tomorrow at midnight.

After that, it goes to the next person in line.

This isn\'t fake scarcity - we only allow one operator per territory to ensure success.`,
      cta: 'Secure Your Territory Now',
      ctaLink: 'https://remoteops.ai/apply?urgent=true',
    },
  }[contentType];

  return (
    <Html>
      <Head />
      <Preview>{content.preview}</Preview>
      <Body style={baseStyles.main}>
        <Container style={baseStyles.container}>
          <Heading style={baseStyles.heading}>
            Hi {firstName},
          </Heading>
          <Text style={baseStyles.paragraph}>
            {content.body}
          </Text>
          <Button
            style={baseStyles.button}
            href={content.ctaLink}
          >
            {content.cta} →
          </Button>
          <Hr style={baseStyles.hr} />
          <Text style={{ ...baseStyles.paragraph, fontSize: '13px', color: '#6b7280' }}>
            You're receiving this because you showed interest in the APEX Operator License.
            <Link href="https://remoteops.ai/unsubscribe" style={{ color: '#6b7280', textDecoration: 'underline' }}>
              Unsubscribe
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export {
  baseStyles,
};