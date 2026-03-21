import {prisma} from "@/prisma/prisma-client";

export const getVerificationEmailTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        email: email
      }
    })

    return verificationToken;
  } catch (error) {
    console.log(error);
  }
}

export const getVerificationEmailTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token: token
      }
    })

    return verificationToken;
  } catch (error) {
    console.log(error);
  }
}

export const getResetPasswordTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.passwordResetToken.findFirst({
      where: {
        email: email
      }
    })

    return verificationToken;
  } catch (error) {
    console.log(error);
  }
};

export const getResetPasswordTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.passwordResetToken.findFirst({
      where: {
        token: token
      }
    })

    return verificationToken;
  } catch (error) {
    console.log(error);
  }
};