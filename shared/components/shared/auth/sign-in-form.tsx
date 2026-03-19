// "use client";
//
// import {useRouter} from "next/navigation";
// import {signIn} from "next-auth/react";
// import type {FormEventHandler} from "react";
// import {GithubButton} from "@/shared/components/shared/auth/github-button";
// import {GoogleButton} from "@/shared/components/shared/auth/google-button";
//
// export const SignInForm = () => {
//   const router = useRouter();
//
//   const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
//     event.preventDefault();
//
//     const formData = new FormData(event.currentTarget);
//
//     const res = await signIn("credentials", {
//       email: formData.get("email"),
//       password: formData.get("password"),
//       redirect: false,
//     });
//
//     if (res && !res.error) {
//       router.push("/profile");
//     } else {
//       console.log(res);
//     }
//   };
//
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       <div className="flex flex-col gap-2">
//         <GithubButton />
//         <GoogleButton />
//       </div>
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-4 w-56 mt-6"
//       >
//         <div className="relative">
//           <input
//             id='form-email'
//             type="email"
//             name="email"
//             required
//             placeholder=" "
//             className="peer w-full px-4 py-3 text-sm text-gray-900
//                  bg-white border border-gray-300 rounded-xl
//                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
//                  hover:border-gray-400 transition-all duration-200
//                  placeholder-transparent"
//           />
//           <label
//             htmlFor="form-email"
//             className="absolute left-4 -top-2.5 px-1 text-xs text-gray-600
//                       bg-white transition-all duration-200
//                       peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
//                       peer-placeholder-shown:top-3 peer-placeholder-shown:left-4
//                       peer-placeholder-shown:bg-transparent
//                       peer-focus:-top-2.5 peer-focus:left-4 peer-focus:text-xs
//                       peer-focus:text-blue-600 peer-focus:bg-white cursor-text"
//           >
//             Email
//           </label>
//         </div>
//         <div className="relative">
//           <input
//             id='form-password'
//             type="password"
//             name="password"
//             required
//             placeholder=" "
//             className="peer w-full px-4 py-3 text-sm text-gray-900
//                  bg-white border border-gray-300 rounded-xl
//                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
//                  hover:border-gray-400 transition-all duration-200
//                  placeholder-transparent"
//           />
//           <label
//             htmlFor="form-password"
//             className="absolute left-4 -top-2.5 px-1 text-xs text-gray-600
//                       bg-white transition-all duration-200
//                       peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
//                       peer-placeholder-shown:top-3 peer-placeholder-shown:left-4
//                       peer-placeholder-shown:bg-transparent
//                       peer-focus:-top-2.5 peer-focus:left-4 peer-focus:text-xs
//                       peer-focus:text-blue-600 peer-focus:bg-white cursor-text"
//           >
//             Password
//           </label>
//         </div>
//         <button
//           type="submit"
//           className="w-full px-4 py-3 text-sm font-medium text-white
//                bg-blue-600 border border-transparent rounded-xl
//                hover:bg-blue-700 active:bg-blue-800
//                transition-all duration-200
//                shadow-md hover:shadow-lg
//                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//         >
//           Sign In
//         </button>
//       </form>
//     </div>
//   );
// };

"use client";

import {useForm} from "react-hook-form";
import CardWrapper from "./card-wrapper";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginSchema} from "@/schemas";
import {z} from "zod";
import {useState} from "react";
import {FormError} from "./form-error";
import {login} from "@/actions/login";
import Link from "next/link";
import {Input} from "@/shared/components/ui/input";
import {Button} from "@/shared/components/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    login(data).then((res) => {
      if (res?.error) {
        setError(res?.error);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Log in to your account"
      title="Login"
      backButtonHref="/register"
      backButtonLabel="Don't have an account? Register here."
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="johndoe@email.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******"
                           type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              size="sm"
              variant="link"
              asChild
              className="px-0 font-normal"
            >
              <Link href="/auth/reset">Forgot password?</Link>
            </Button>
          </div>
          <FormError message={error} />
          <Button
            type="submit"
            className="w-full"
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;