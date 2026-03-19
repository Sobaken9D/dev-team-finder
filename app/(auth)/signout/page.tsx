'use client';

import {signOut} from 'next-auth/react';
import Link from 'next/link';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function SignOutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({callbackUrl: '/'});
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        {/* Иконка выхода */}
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Выход из системы
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Вы уверены, что хотите выйти?
        </p>

        <div className="space-y-3">
          <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="w-full px-4 py-3 text-sm font-medium text-white
                       bg-red-600 border border-transparent rounded-xl
                       hover:bg-red-700 active:bg-red-800
                       transition-all duration-200
                       shadow-md hover:shadow-lg
                       focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Выход...</span>
              </>
            ) : (
              'Да, выйти'
            )}
          </button>

          <Link
            href="/profile"
            className="block w-full px-4 py-3 text-sm font-medium text-gray-700
                       bg-gray-100 border border-transparent rounded-xl
                       hover:bg-gray-200 active:bg-gray-300
                       transition-all duration-200
                       text-center"
          >
            Нет, остаться
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Будет выполнен выход из:</span>
            <span className="font-medium text-gray-900">user@example.com</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-gray-500">Активные сессии:</span>
            <span className="font-medium text-gray-900">2 устройства</span>
          </div>
        </div>
      </div>
    </div>
  );
}