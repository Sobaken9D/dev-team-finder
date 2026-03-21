import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY)

const domain = "http://localhost:3000"

export const sendVerificationEmail = async (email: string, token: string) => {
  // we send the user there
  const confirmationLink = `${domain}/verify-request?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href="${confirmationLink}">here</a> to verify your email.</p>`
  })
}

export const sendVerificationResetPassword = async (email: string, token: string) => {
  // we send the user there
  const confirmationLink = `${domain}/reset-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${confirmationLink}">here</a> to reset your password.</p>`
  })
}