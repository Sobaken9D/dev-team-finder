// кастомная аутентификация
import LoginForm from "@/shared/components/shared/auth/sign-in-form";

export default async function Signin() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="xl:w-1/4 md:w-1/2 w-full px-10 sm:px-0">
        <LoginForm />
      </div>
    </div>
  );
}