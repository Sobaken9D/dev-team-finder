import {
  getResetPasswordTokenByEmail,
  getVerificationEmailTokenByEmail
} from '@/data/verification-token';
import {v4 as uuidv4} from 'uuid';
import {prisma} from "@/prisma/prisma-client";

export const generateVerificationEmailToken = async (email: string) => {
  // Generate a random token
  const token = uuidv4();
  const expires = new Date().getTime() + 1000 * 60 * 60 * 1; // 1 hours

  // Check if a token already exists for the user
  const existingToken = await getVerificationEmailTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  // Create a new verification token
  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires: new Date(expires)
    }
  })

  return verificationToken;
};

export const generateVereficationPasswordResetToken = async (email: string) => {
  // Generate a random token
  const token = uuidv4();
  const expires = new Date().getTime() + 1000 * 60 * 60 * 1; // 1 hours

  const existingToken = await getResetPasswordTokenByEmail(email);

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  // Create a new verification token
  const verificationPasswordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires: new Date(expires)
    }
  })

  return verificationPasswordResetToken;
};