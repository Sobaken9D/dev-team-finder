"use server";

// zod для валидации данных в runtime (проверяет типы)
import * as z from "zod";
import {prisma} from "@/prisma/prisma-client";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

// z.infer<typeof RegisterSchema> - вытаскивает тип из схемы
export const register = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    // Validate the input data
    const validatedData = RegisterSchema.parse(data);

    //  If the data is invalid, return an error
    if (!validatedData) {
      return { error: "Invalid input data" };
    }

    //  Destructure the validated data
    const { email, name, password, passwordConfirmation } = validatedData;

    // Check if passwords match
    if (password !== passwordConfirmation) {
      return { error: "Passwords do not match" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check to see if user already exists
    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    // If the user exists, return an error
    if (userExists) {
      return { error: "Email already is in use. Please try another one." };
    }

    const lowerCaseEmail = email.toLowerCase();

    // Create the user
    const user = await prisma.user.create({
      data: {
        email: lowerCaseEmail,
        username: name,
        password: hashedPassword,
        role: 'USER',
        verified: new Date(),
      },
    });

    // Generate a verification token
    const verificationToken = await generateVerificationToken(email)

    await sendVerificationEmail(email, verificationToken.token)

    return { success: "Email Verification was sent" };
  } catch (error) {
    // Handle the error, specifically check for a 503 error
    // 503 - перегрузка или технические работы на сервере
    console.error("Database error:", error);

    if ((error as { code: string }).code === "ETIMEDOUT") {
      return {
        error: "Unable to connect to the database. Please try again later.",
      };
    } else if ((error as { code: string }).code === "503") {
      return {
        error: "Service temporarily unavailable. Please try again later.",
      };
    } else {
      return { error: "An unexpected error occurred. Please try again later." };
    }
  }
};