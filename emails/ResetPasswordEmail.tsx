import { Body, Button, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from 'react-email'

type ResetPasswordEmailProps = {
  verificationUrl: string
}

export default function ResetPasswordEmail({ verificationUrl }: ResetPasswordEmailProps) {
  return (
    <Html lang="en">
      <Head />

      <Preview>Reset your FeeRadar password</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Reset your password</Heading>

          <Text style={styles.text}>We received a request to reset the password for your FeeRadar account.</Text>

          <Section style={styles.buttonSection}>
            <Button href={verificationUrl} style={styles.button}>
              Reset password
            </Button>
          </Section>

          <Text style={styles.text}>This password reset link will expire after a limited time and can only be used once.</Text>

          <Hr style={styles.divider} />

          <Text style={styles.footer}>
            If you didn&apos;t request a password reset, you can safely ignore this email. Your password will remain unchanged.
          </Text>

          <Text style={styles.footer}>
            Need help?{' '}
            <Link href="mailto:support@notifications.feeradar.com" style={styles.link}>
              Contact FeeRadar support
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const styles = {
  body: {
    backgroundColor: '#111827',
    color: '#f1f5f9',
    fontFamily: 'Arial, Helvetica, sans-serif',
    margin: 0,
    padding: '40px 16px'
  },

  container: {
    backgroundColor: '#1a2333',
    border: '1px solid #334155',
    borderRadius: '12px',
    margin: '0 auto',
    maxWidth: '560px',
    padding: '40px 32px'
  },

  heading: {
    color: '#f8fafc',
    fontSize: '28px',
    lineHeight: '36px',
    margin: '0 0 16px'
  },

  text: {
    color: '#cbd5e1',
    fontSize: '16px',
    lineHeight: '26px',
    margin: '0 0 24px'
  },

  buttonSection: {
    margin: '28px 0',
    textAlign: 'center' as const
  },

  button: {
    backgroundColor: '#22d3ee',
    borderRadius: '8px',
    color: '#083344',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: '600',
    padding: '14px 24px',
    textDecoration: 'none'
  },

  divider: {
    borderColor: '#334155',
    margin: '32px 0 24px'
  },

  footer: {
    color: '#94a3b8',
    fontSize: '13px',
    lineHeight: '20px',
    margin: '8px 0'
  },

  link: {
    color: '#22d3ee',
    textDecoration: 'underline'
  }
}
