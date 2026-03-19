"use server"

import {getUserByEmail} from "@/data/user"
import {getVerificationTokenByToken} from "@/data/verification-token"
import {prisma} from "@/prisma/prisma-client";

// для подтверждения почты в БД
export const newVerification = async (token: string) => {
  // проверка (при переходе по ссылке с почты) создавался ли вообще такой токен?
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {error: "Invalid token"};
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {error: "Token has expired"};
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {error: "User not found"};
  }

  await prisma.user.update({
    where: {
      id: existingUser.id
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email
    }
  })

  await prisma.verificationToken.delete({
    where: {
      id: existingToken.id
    }
  })

  return {success: "Email verified"}
}