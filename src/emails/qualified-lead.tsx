import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Button,
} from '@react-email/components';
import * as React from 'react';

interface QualifiedLeadEmailProps {
  name: string;
  score: number;
  calendarLink: string;
}

export const QualifiedLeadEmail = ({
  name = 'there',
  score = 85,
  calendarLink = 'https://calendly.com/apex-operations/discovery',
}: QualifiedLeadEmailProps) => {
  const previewText = `Congratulations ${name}, you've been selected for APEX Operations`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Heading style={heading}>APEX OPERATIONS</Heading>
            
            <Text style={paragraph}>
              Dear {name},
            </Text>

            <Text style={paragraph}>
              Congratulations. After reviewing your application, we believe you have the potential to build a $10K/month home service empire.
            </Text>

            <Text style={paragraph}>
              Your qualification score of {score}/100 indicates strong alignment with our program requirements. You've demonstrated the business acumen, financial readiness, and commitment level we look for in our operators.
            </Text>

            <Text style={paragraph}>
              <strong>Your Next Step:</strong>
            </Text>

            <Text style={paragraph}>
              Schedule a confidential strategy session with our team. During this 45-minute call, we'll:
            </Text>

            <ul style={list}>
              <li>Review your specific market opportunity</li>
              <li>Discuss your 12-week transformation timeline</li>
              <li>Answer any questions about the APEX system</li>
              <li>Determine if we're the right fit for each other</li>
            </ul>

            <Section style={buttonSection}>
              <Button
                style={button}
                href={calendarLink}
              >
                Schedule Your Strategy Session
              </Button>
            </Section>

            <Text style={paragraph}>
              <strong>Important:</strong> We only accept 7 operators annually. Strategy sessions are limited and offered on a first-come, first-served basis to qualified applicants.
            </Text>

            <Text style={paragraph}>
              If you're unable to find a suitable time, reply to this email and we'll work to accommodate your schedule.
            </Text>

            <Text style={footer}>
              To your transformation,<br />
              The APEX Operations Team
            </Text>

            <Text style={disclaimer}>
              P.S. This invitation is non-transferable and expires in 72 hours. We maintain strict confidentiality for all our operators.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const box = {
  padding: '0 48px',
};

const heading = {
  color: '#000',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '40px',
  margin: '40px 0',
  textAlign: 'center' as const,
  letterSpacing: '2px',
};

const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  margin: '16px 0',
};

const list = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
  paddingLeft: '20px',
};

const buttonSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#d97706',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const footer = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  marginTop: '32px',
  marginBottom: '16px',
};

const disclaimer = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '20px',
  textAlign: 'left' as const,
  margin: '16px 0',
  fontStyle: 'italic',
};

export default QualifiedLeadEmail;