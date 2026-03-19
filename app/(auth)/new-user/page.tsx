'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function NewUserPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    avatar: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Завершение регистрации
      router.push('/profile');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        {/* Прогресс бар */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${i <= step
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'}`}
              >
                {i}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{width: `${(step / 3) * 100}%`}}
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          {step === 1 && 'Добро пожаловать!'}
          {step === 2 && 'Расскажите о себе'}
          {step === 3 && 'Почти готово'}
        </h1>

        <p className="text-center text-gray-600 mb-8">
          {step === 1 && 'Давайте создадим ваш профиль'}
          {step === 2 && 'Как к вам обращаться?'}
          {step === 3 && 'Выберите аватар'}
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {step === 1 && (
            <div className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Полное имя"
                  value={formData.fullName}
                  onChange={(e) => setFormData({
                    ...formData,
                    fullName: e.target.value
                  })}
                  className="w-full pl-11 pr-4 py-3 text-sm text-gray-900
                             bg-white border border-gray-300 rounded-xl
                             placeholder:text-gray-400
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                             hover:border-gray-400 transition-all duration-200"
                  required
                />
              </div>

              <div className="relative">
                <span className="absolute left-4 top-3.5 text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Имя пользователя"
                  value={formData.username}
                  onChange={(e) => setFormData({
                    ...formData,
                    username: e.target.value
                  })}
                  className="w-full pl-11 pr-4 py-3 text-sm text-gray-900
                             bg-white border border-gray-300 rounded-xl
                             placeholder:text-gray-400
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                             hover:border-gray-400 transition-all duration-200"
                  required
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  placeholder="Немного о себе (необязательно)"
                  rows="4"
                  className="w-full px-4 py-3 text-sm text-gray-900
                             bg-white border border-gray-300 rounded-xl
                             placeholder:text-gray-400 resize-none
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                             hover:border-gray-400 transition-all duration-200"
                />
              </div>

              <div className="relative">
                <select
                  className="w-full px-4 py-3 text-sm text-gray-900
                             bg-white border border-gray-300 rounded-xl
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                             hover:border-gray-400 transition-all duration-200"
                >
                  <option value="">Выберите часовой пояс</option>
                  <option value="msk">Москва (MSK)</option>
                  <option value="spb">Санкт-Петербург (MSK)</option>
                  <option value="ekb">Екатеринбург (YEKT)</option>
                  <option value="nsk">Новосибирск (NOVT)</option>
                  <option value="vld">Владивосток (VLAT)</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {formData.avatar ? (
                      <Image
                        src={formData.avatar}
                        alt="Avatar"
                        width={96}
                        height={96}
                      />
                    ) : (
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    )}
                  </div>
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full
                               flex items-center justify-center text-white
                               hover:bg-blue-700 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <button
                    key={i}
                    type="button"
                    className="aspect-square bg-gray-100 rounded-lg hover:bg-gray-200
                               transition-colors flex items-center justify-center
                               text-gray-600 text-sm"
                  >
                    #{i}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 px-4 py-3 text-sm font-medium text-gray-700
                           bg-gray-100 border border-transparent rounded-xl
                           hover:bg-gray-200 active:bg-gray-300
                           transition-all duration-200"
              >
                Назад
              </button>
            )}
            <button
              type="submit"
              className="flex-1 px-4 py-3 text-sm font-medium text-white
                         bg-blue-600 border border-transparent rounded-xl
                         hover:bg-blue-700 active:bg-blue-800
                         transition-all duration-200
                         shadow-md hover:shadow-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {step < 3 ? 'Продолжить' : 'Завершить'}
            </button>
          </div>
        </form>

        <p className="text-xs text-center text-gray-500 mt-6">
          Нажимая "Продолжить", вы соглашаетесь с{' '}
          <Link
            href="/terms"
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            условиями использования
          </Link>
        </p>
      </div>
    </div>
  );
}