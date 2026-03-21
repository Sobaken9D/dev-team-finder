// export const resetPassword = async (data: z.infer<typeof ResetPasswordSchema>, token: string) => {
//   try {
//     // Validate the input data
//     const validatedData = ResetPasswordSchema.parse(data);
//
//     // If the data is invalid, return an error
//     if (!validatedData) {
//       return {error: "Invalid input data."};
//     }
//
//     // Destructure the validated data
//     const {password, passwordConfirmation} = validatedData;
//
//     // Check if user exists
//     const userExists = await getUserByEmail(email);
//
//     // If the user does not exist, return an error
//     if (!userExists || !userExists.email) {
//       return {error: "The user with this email is not registered."};
//     }
//
//     // нельзя сбрасывать пароль при oAuth
//     // if (!userExists.password) {
//     //   return {error: "This account uses social login. Please sign in with Google or GitHub."};
//     // }
//
//     const passwordResetToken = await generateVereficationPasswordResetToken(email);
//
//     await sendVerificationResetPassword(passwordResetToken.email, passwordResetToken.token);
//
//     return {success: "Password reset link has been sent to your email. Check the email for the reset URL."};
//   } catch (error) {
//     console.error("Forgot password error:", error.code, error.message);
//     return {error: `ERROR: ${error.message}; CODE: ${error.code}`};
//   }
// };


// "use server"
//
// import {getUserByEmail} from "@/data/user"
// import {getVerificationEmailTokenByToken} from "@/data/verification-token"
// import {prisma} from "@/prisma/prisma-client";
//
// // для подтверждения почты в БД
// export const newVerification = async (token: string) => {
//   // проверка (при переходе по ссылке с почты) создавался ли вообще такой токен?
//   const existingToken = await getVerificationEmailTokenByToken(token);
//
//   if (!existingToken) {
//     return {error: "Invalid token"};
//   }
//
//   const hasExpired = new Date(existingToken.expires) < new Date();
//
//   if (hasExpired) {
//     return {error: "Token has expired"};
//   }
//
//   const existingUser = await getUserByEmail(existingToken.email);
//
//   if (!existingUser) {
//     return {error: "User not found"};
//   }
//
//   await prisma.user.update({
//     where: {
//       id: existingUser.id
//     },
//     data: {
//       emailVerified: new Date(),
//       email: existingToken.email
//     }
//   })
//
//   await prisma.verificationToken.delete({
//     where: {
//       id: existingToken.id
//     }
//   })
//
//   return {success: "Email verified"}
// }

"use server";

import * as z from "zod";
import {ResetPasswordSchema} from "@/schemas";
import {getUserByEmail} from "@/data/user";
import {getResetPasswordTokenByToken} from "@/data/verification-token";
import {prisma} from "@/prisma/prisma-client";
import bcrypt from "bcryptjs";

export const resetPassword = async (data: z.infer<typeof ResetPasswordSchema>, token: string) => {
  try {
    // проверка данных с формы
    const validatedData = ResetPasswordSchema.parse(data);
    // Destructure the validated data
    const {password, passwordConfirmation} = validatedData;

    if (password !== passwordConfirmation) {
      return {error: "Passwords do not match!"};
    }

    // проверка (при переходе по ссылке с почты) создавался ли вообще такой токен?
    const existingToken = await getResetPasswordTokenByToken(token);

    if (!existingToken) {
      return {error: "Invalid token"};
    }

    // не истек ли токен
    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return {error: "Token has expired"};
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return {error: "User not found"};
    }

    // If the data is invalid, return an error
    if (!validatedData) {
      return {error: "Invalid input data."};
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        id: existingUser.id
      },
      data: {
        password: hashedPassword,
      }
    })

    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id
      }
    })

    return {success: "Password updated successfully!"};
  } catch (error) {
    console.error("Reset password error:", error.code, error.message);
    return {error: `ERROR: ${error.message}; CODE: ${error.code}`};
  }
};