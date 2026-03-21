"use client"

import {useForm} from "react-hook-form";
import CardWrapper from "./card-wrapper";
import {zodResolver} from "@hookform/resolvers/zod";
import {ForgotPasswordSchema} from "@/schemas";
import {z} from "zod";
import {useState} from "react";
import {FormError} from "./form-error";
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
import {FormSuccess} from "@/shared/components/shared/auth/form-success";
import {forgotPassword} from "@/actions/forgot-password";

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    setIsSubmit(true);
    setLoading(true);
    forgotPassword(data).then((res) => {
      if (res.success) {
        setSuccess(res.success);
      }
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
      title="Forgor password"
      headerLabel="Enter your email to receive a password reset link"
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            {isSubmit ?
              <div className="flex items-center w-full justify-center">
                {!success && !error && <p>Loading...</p>}
                <FormSuccess message={success} />
                {!success && <FormError message={error} />}
              </div> :
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
            }
          </div>
          {/*<FormError message={error} />*/}
          <Button
            type="submit"
            className="w-full"
            disabled={success}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
          <Button
            type="submit"
            className="w-full"
          >
            <Link href="/signin">Back to Login</Link>
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default ForgotPasswordForm