"use client"

import {useForm} from "react-hook-form";
import CardWrapper from "./card-wrapper";
import {zodResolver} from "@hookform/resolvers/zod";
import {ResetPasswordSchema} from "@/schemas";
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
import {resetPassword} from "@/actions/reset-password";
import {useSearchParams} from "next/navigation";

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: ""
    },
  });

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    setIsSubmit(true);
    setLoading(true);
    resetPassword(data).then((res) => {
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
      title="Reset password"
      headerLabel="Enter your new password"
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            {
              isSubmit ?
                <div className="flex items-center w-full justify-center">
                  {!success && !error && <p>Loading...</p>}
                  <FormSuccess message={success} />
                  {!success && <FormError message={error} />}
                </div> :
                <div>
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
                  <FormField
                    control={form.control}
                    name="passwordConfirmation"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Confirm new password</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="******"
                                 type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
            }
          </div>
          {/*<FormError message={error} />*/}
          <Button
            type="submit"
            className="w-full"
            disabled={success}
          >
            {loading ? "Resetting..." : "Reset Password"}
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
  )
    ;
}

export default ResetPasswordForm;