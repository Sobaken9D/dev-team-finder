import type {Metadata} from "next";
import React from "react";

// Для CEO
export const metadata: Metadata = {
  title: "DTF | Главная"
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className='min-h-screen'>
      {/*Сами страницы*/}
      {children}
    </main>
  );
}
