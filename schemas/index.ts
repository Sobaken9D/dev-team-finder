import * as z from 'zod';

// z.object - ожидаем на вход объект
// z.string - проверка на строку
// z.email - валидация емейла

export const RegisterSchema = z.object({
  email: z.string().email({
    message: " Please enter a valid email address."
  }),
  name: z.string().min(1, {
    message: "Name is required."
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long."
  }),
  passwordConfirmation: z.string().min(6, {
    message: "Password must be at least 6 characters long."
  })
})

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Please enter a valid password",
  })
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  })
});

// export const ResetPasswordSchema = z.object({
//   password: z.string().min(6, {
//     message: "Password must be at least 6 characters long."
//   }),
//   passwordConfirmation: z.string().min(6, {
//     message: "Password must be at least 6 characters long."
//   })
// });

export const ResetPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long."
  }),
  passwordConfirmation: z.string().min(6, {
    message: "Password must be at least 6 characters long."
  })
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"], // указываем, на каком поле показывать ошибку
});