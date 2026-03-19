Авторизация реализована на Auth.js (https://authjs.dev/) (сейчас часть Better
auth, а ранее Next Auth).

Необходимые библиотеки:

1. "@prisma/client" - для работы с БД (выполнения запросов к БД и тд.).
2. "prisma" - CLI для prisma.
3. "next-auth" - готовое решение для аутентификации (предоставляет различные
   методы для работы(useSession(), signIn() / signOut() и тд.)).
4. "@auth/prisma-adapter" — это связующее звено между библиотекой аутентификации
   Auth.js и вашей базой данных через ORM Prisma.
5. "@prisma/adapter-pg" - позволяет Prisma использовать стандартный.
   JavaScript-драйвер pg (node-postgres) для работы с базой данных.
6. "zod" - для валидации схем данных в TypeScript и JavaScript (проверки в
   формах при регистрации и тд.).
7. "bcrypt" - для работы с паролями.
8. "uuid" - для генерации токенов.
9. "resent" - для генерации писем верификации.

Основная конфигурация авторизации - (/configs/auth.ts)

1. secret - генерируем через npx auth secret.
2. pages - переадресация на страницы для конкретных действий (/signIn и тд.)
3. adapter - для связи БД с призмой.
4. providers - способы входа (через google, github, и тд.).
5. session - для описания стратегии хранения данных сессии (например - jwt
   токен)
6. callbacks - описание колбэков (например для signIn и тд.)

Схема БД определена в (prisma/schema.prisma). Базовые поля для User - (id, name,
email, password, emailVerified). Базовые поля VerefiacationToken - (id, email,
token, userId, createdAt и комбинацию [email, token]).

Для того, что-бы перехватывать все запросы [.../api/auth/...] - (
/app/api/auth/[...nextauth]/route.ts).

Серверные действия (логин, регистрация и подтверждение почты) определены в (
/actions/...).

Вспомогательные методы (генерация токена и отправка подтверждающего email) - (
/lib/...).

Методы для получение данных (получение user и token) - (/data/...).

Отправка на почту письма верефикации происходит через
Resent (https://resend.com/). Метод для отправки - (/lib/mail.ts). В .env
необходимо добавить RESEND_API_KEY.

В файле (/middleware.ts) перечисляется набор защищенных роутов. Т.е ссылки на
которые нельзя перейти без аутентификации.

Провайдеры добавляются в (/configs/auth.ts). Для работы необходимо настроить сам
API (google - https://console.cloud.google.com/ и/или
github - https://github.com/settings/apps/). И добавить в .env -
GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_ID, GITHUB_SECRET.