// 'use client';
//
// import Link from 'next/link';
// import {useSearchParams} from 'next/navigation';
// import {useEffect, useState} from 'react';
//
// export default function VerifyRequestPage() {
//   const searchParams = useSearchParams();
//   const email = searchParams.get('email');
//   const [timeLeft, setTimeLeft] = useState(60);
//
//   useEffect(() => {
//     if (timeLeft > 0) {
//       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [timeLeft]);
//
//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
//         {/* Иконка конверта */}
//         <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//           <svg
//             className="w-8 h-8 text-blue-600"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//             />
//           </svg>
//         </div>
//
//         <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
//           Проверьте вашу почту
//         </h1>
//
//         <p className="text-center text-gray-600 mb-6">
//           {email ? (
//             <>Мы отправили ссылку для входа на <span className="font-medium text-gray-900">{email}</span></>
//           ) : (
//             'Мы отправили ссылку для входа на вашу электронную почту'
//           )}
//         </p>
//
//         <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
//           <div className="flex gap-3">
//             <svg
//               className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             <div className="text-sm text-blue-700">
//               <p className="font-medium mb-1">Что дальше?</p>
//               <ul className="list-disc list-inside space-y-1">
//                 <li>Перейдите по ссылке в письме</li>
//                 <li>Ссылка действительна в течение 24 часов</li>
//                 <li>Если письма нет, проверьте папку "Спам"</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//
//         <div className="space-y-3">
//           <button
//             disabled={timeLeft > 0}
//             className="w-full px-4 py-3 text-sm font-medium text-white
//                        bg-blue-600 border border-transparent rounded-xl
//                        hover:bg-blue-700 active:bg-blue-800
//                        transition-all duration-200
//                        shadow-md hover:shadow-lg
//                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
//                        disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {timeLeft > 0 ? `Отправить повторно через ${timeLeft}с` : 'Отправить повторно'}
//           </button>
//
//           <Link
//             href="/signin"
//             className="block w-full px-4 py-3 text-sm font-medium text-gray-700
//                        bg-gray-100 border border-transparent rounded-xl
//                        hover:bg-gray-200 active:bg-gray-300
//                        transition-all duration-200
//                        text-center"
//           >
//             Вернуться к входу
//           </Link>
//         </div>
//
//         <p className="text-xs text-center text-gray-500 mt-6">
//           Не пришло письмо? Проверьте правильность введенного email или{' '}
//           <button className="text-blue-600 hover:text-blue-700 hover:underline">
//             свяжитесь с поддержкой
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }


import React from 'react'
import VerifyEmailForm from "@/shared/components/shared/auth/verify-email-form";

const VerifyEmailPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="w-[500px] px-10 sm:px-0">
        <VerifyEmailForm />
      </div>

    </div>
  )
}

export default VerifyEmailPage