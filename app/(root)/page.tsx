import {Header} from "@/shared/components/shared";
import {RegisterForm} from "@/shared/components/shared/auth/register-form";
import {Navigation} from "@/shared/components/shared/navigation";

export const navLinks = [
  {label: "Home", href: "/"},
  {label: "Blog", href: "/blog"},
  {label: "About", href: "/about"},
];

export default function Home() {
  return (
    <Navigation navLinks={navLinks}></Navigation>
  // <Header className="mb"/>
  // <RegisterForm></RegisterForm>
  //
  );
}
