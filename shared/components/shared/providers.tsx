'use client';

import {SessionProvider} from 'next-auth/react';
import React from "react";

// Предоставление контекста аутентификации всем дочерним компонентам
// const { data: session, status } = useSession();
export const Providers = ({children} : {children: React.ReactNode}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}

