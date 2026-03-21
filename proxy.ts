// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
//
// // This function can be marked `async` if using `await` inside
// export function proxy(request: NextRequest) {
//   return NextResponse.redirect(new URL('/register', request.url))
// }
//
// export const config = {
//   matcher: '/profile/:path*',
// }

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import NextAuth from "next-auth";
import authConfig from "@/configs/auth.config";

// Инициализируем auth для проверки сессии внутри прокси
const { auth } = NextAuth(authConfig);

export async function proxy(request: NextRequest) {
  // Получаем данные сессии
  const session = await auth();
  const isLoggedIn = !!session;

  const isProfilePage = request.nextUrl.pathname.startsWith("/profile");

  // Если это страница профиля и пользователь НЕ залогинен — только тогда редирект
  if (isProfilePage && !isLoggedIn) {
    return NextResponse.redirect(new URL('/register', request.url));
  }

  // Если пользователь залогинен или это другая страница — пропускаем
  return NextResponse.next();
}

// Экспортируем как middleware, чтобы Next.js его подхватил
export default proxy;

export const config = {
  matcher: '/profile/:path*',
}