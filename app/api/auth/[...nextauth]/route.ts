// Пример работа аутентификации в отличии от регистрации:
// При первом входе через Google:
// 1. Пользователь аутентифицируется через Google
// 2. Система проверяет email в БД
// 3. Если пользователь новый — автоматически создается запись
// 4. Пользователь входит в систему

export {GET, POST} from '@/configs/auth';

//
// import { handlers } from "@/configs/auth" // Импортируем из вашего конфига выше
//
// export const { GET, POST } = handlers

// import NextAuth from "next-auth";
// import { authConfig } from "@/configs/auth";
//
// const handler = NextAuth(authConfig);
//
// export { handler as GET, handler as POST };

