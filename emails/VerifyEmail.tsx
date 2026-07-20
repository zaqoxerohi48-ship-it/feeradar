import { Body, Button, Container, Head, Heading, Html, Preview, Text } from 'react-email'

type VerifyEmailProps = {
  verificationUrl: string
}

export default function VerifyEmail({ verificationUrl }: VerifyEmailProps) {
  return (
    <Html>
      <Head />

      <Preview>Verify your FeeRadar email address</Preview>

      <Body style={body}>
        <Container style={container}>
          <Heading>Verify your email</Heading>

          <Text>Confirm your email address to finish creating your FeeRadar account.</Text>

          <Button href={verificationUrl} style={button}>
            Verify email
          </Button>

          <Text style={mutedText}>If you didn&apos;t create a FeeRadar account, you can ignore this email.</Text>
        </Container>
      </Body>
    </Html>
  )
}

const body = {
  backgroundColor: '#111827',
  color: '#f1f5f9',
  fontFamily: 'Arial, sans-serif'
}

const container = {
  margin: '0 auto',
  padding: '40px 24px',
  maxWidth: '560px'
}

const button = {
  backgroundColor: '#22d3ee',
  color: '#083344',
  padding: '12px 20px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: '600'
}

const mutedText = {
  color: '#94a3b8',
  fontSize: '14px',
  marginTop: '24px'
}
