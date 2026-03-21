"use server";

// zod для валидации данных в runtime (проверяет типы)
import * as z from "zod";
import {prisma} from "@/prisma/prisma-client";
import bcrypt from "bcryptjs";
import {RegisterSchema} from "@/schemas";
import {generateVerificationEmailToken} from "@/lib/token";
import {sendVerificationEmail} from "@/lib/mail";

// z.infer<typeof RegisterSchema> - вытаскивает тип из схемы
export const register = async (data: z.infer<typeof RegisterSchema>) => {

  try {
    // Validate the input data
    const validatedData = RegisterSchema.parse(data);

    //  If the data is invalid, return an error
    if (!validatedData) {
      return {error: "Invalid input data"};
    }

    //  Destructure the validated data
    const {email, name, password, passwordConfirmation} = validatedData;

    // Check if passwords match
    if (password !== passwordConfirmation) {
      return {error: "Passwords do not match"};
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check to see if user already exists
    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    const lowerCaseEmail = email.toLowerCase();

    // If the user exists, return an error
    if (userExists) {
      // Если пользователь есть и он ПОДТВЕРЖДЕН — тогда ошибка
      if (userExists.emailVerified) {
        return {error: "Email already is in use. Please try another one."};
      }

      // Если пользователь есть, но НЕ подтвержден — обновляем его данные (на случай если он сменил пароль/имя)
      // и отправляем новое письмо
      await prisma.user.update({
        where: {id: userExists.id},
        data: {
          email: lowerCaseEmail,
          name: name,
          password: hashedPassword,
        },
      });

      const verificationToken = await generateVerificationEmailToken(lowerCaseEmail);
      await sendVerificationEmail(lowerCaseEmail, verificationToken.token);

      return {success: "Confirmation email resent! Please check your inbox."};
    }
    // Create the user
    const user = await prisma.user.create({
      data: {
        email: lowerCaseEmail,
        name: name,
        password: hashedPassword,
        // role: 'USER',
        // verified: new Date(),
      },
    });

    // Generate a verification token
    const verificationToken = await generateVerificationEmailToken(lowerCaseEmail)

    await sendVerificationEmail(lowerCaseEmail, verificationToken.token)

    return {success: "Email Verification was sent"};
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
      return {error: "An unexpected error occurred. Please try again later."};
    }
  }
};