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
} from '@react-email/components';
import * as React from 'react';

interface NotQualifiedEmailProps {
  name: string;
  score: number;
}

export const NotQualifiedEmail = ({
  name = 'there',
  score = 45,
}: NotQualifiedEmailProps) => {
  const previewText = `Thank you for your interest in APEX Operations`;

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
              Thank you for taking the time to explore APEX Operations and share your vision with us.
            </Text>

            <Text style={paragraph}>
              After careful consideration of your application, we've determined that APEX may not be the right fit for your current situation. Our program requires a very specific combination of experience, resources, and timing that ensures success for both our operators and the organization.
            </Text>

            <Text style={paragraph}>
              This decision is not a reflection on your potential or ambitions. Many successful entrepreneurs aren't ready for APEX at their first application but go on to build remarkable businesses.
            </Text>

            <Text style={paragraph}>
              We encourage you to:
            </Text>

            <ul style={list}>
              <li>Continue building your business experience</li>
              <li>Focus on developing systems-based thinking</li>
              <li>Strengthen your financial position</li>
              <li>Consider reapplying in 12-18 months</li>
            </ul>

            <Text style={paragraph}>
              We wish you the very best in your entrepreneurial journey.
            </Text>

            <Text style={footer}>
              Respectfully,<br />
              The APEX Operations Team
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

const footer = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  marginTop: '32px',
  marginBottom: '16px',
};

export default NotQualifiedEmail;