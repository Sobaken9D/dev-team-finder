"use server";

import * as z from "zod";
import {ForgotPasswordSchema} from "@/schemas";
import {getUserByEmail} from "@/data/user";
import {generateVereficationPasswordResetToken} from "@/lib/token";
import {sendVerificationResetPassword} from "@/lib/mail";

export const forgotPassword = async (data: z.infer<typeof ForgotPasswordSchema>) => {
  try {
    // Validate the input data
    const validatedData = ForgotPasswordSchema.parse(data);

    // If the data is invalid, return an error
    if (!validatedData) {
      return {error: "Invalid input data."};
    }

    // Destructure the validated data
    const {email} = validatedData;

    // Check if user exists
    const userExists = await getUserByEmail(email);

    // If the user does not exist, return an error
    if (!userExists || !userExists.email) {
      return {error: "The user with this email is not registered."};
    }

    // нельзя сбрасывать пароль при oAuth
    // if (!userExists.password) {
    //   return {error: "This account uses social login. Please sign in with Google or GitHub."};
    // }

    const passwordResetToken = await generateVereficationPasswordResetToken(email);

    await sendVerificationResetPassword(passwordResetToken.email, passwordResetToken.token);

    return {success: "Password reset link has been sent to your email. Check the email for the reset URL."};
  } catch (error) {
    console.error("Forgot password error:", error.code, error.message);
    return {error: `ERROR: ${error.message}; CODE: ${error.code}`};
  }
};