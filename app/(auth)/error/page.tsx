// 'use client';
//
// import {useSearchParams} from 'next/navigation';
// import Link from 'next/link';
//
// export default function AuthErrorPage() {
//   const searchParams = useSearchParams();
//   const error = searchParams.get('error');
//
//   const errorMessages = {
//     GithubEmailRequired: {
//       title: 'Требуется публичный email',
//       message: 'GitHub аккаунт должен иметь публичный email.',
//       solution: 'Сделайте email публичным в настройках GitHub или используйте другой способ входа.',
//       link: 'https://github.com/settings/emails'
//     },
//     AccessDenied: {
//       title: 'Доступ запрещен',
//       message: 'У вас нет прав для входа в систему.',
//       solution: 'Пожалуйста, используйте другой способ входа или попробуйте еще раз позже.'
//     },
//   };
//
//   const errorInfo = errorMessages[error] || {
//     title: 'Ошибка аутентификации',
//     message: 'Произошла ошибка при попытке входа.',
//     solution: 'Пожалуйста, попробуйте еще раз.'
//   };
//
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="w-96 p-8 bg-white rounded-2xl shadow-lg text-center">
//         <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//           <svg
//             className="w-8 h-8 text-red-500"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//             />
//           </svg>
//         </div>
//
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">{errorInfo.title}</h1>
//         <p className="text-gray-600 mb-2">{errorInfo.message}</p>
//         <p className="text-sm text-gray-500 mb-6">{errorInfo.solution}</p>
//
//         {errorInfo.link && (
//           <a
//             href={errorInfo.link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-block mb-4 text-blue-600 hover:text-blue-800 hover:underline"
//           >
//             Перейти к настройкам →
//           </a>
//         )}
//
//         <Link
//           href="/signin"
//           className="block w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
//         >
//           Вернуться к входу
//         </Link>
//       </div>
//     </div>
//   );
// }