'use client';

import Link from 'next/link';
import {usePathname} from "next/navigation";
import {useSession, signOut} from "next-auth/react";
import {cn} from "@/lib/utils";

type NavLink = {
  label: string;
  href: string;
};

type Props = {
  navLinks: NavLink[];
};

// /signin в link для кастомной аутентификации

export const Navigation = ({navLinks}: Props) => {
  const pathname = usePathname();
  const session = useSession();

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.label}
            href={link.href}
            className={cn((isActive ? 'active' : ''), 'pr-3')}
          >
            {link.label}
          </Link>
        );
      })}
      {session?.data && (<Link className="pr-3" href="/profile">Profile</Link>)}
      {session?.data ? (<Link
        href="#"
        onClick={() => signOut({
          callbackUrl: "/"
        })}
      >Sign Out</Link>) : (<Link href="/register">Sign In</Link>)}
    </>
  );
}

