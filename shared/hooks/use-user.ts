import {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

import {
  UserRole,
  ExperienceLevel,
  EnglishLevel,
  ProgrammingLanguage,
  Framework,
  Tool
} from '@/generated/prisma/client';

export interface User {
  // ID (Int в Prisma, но в JS/TS лучше использовать number)
  id: number;

  // Основная информация
  fullName: string | null;
  email: string;
  password: string;
  role: UserRole;
  verified: Date | null;
  username: string;
  avatar: string | null;
  country: string | null;
  about: string | null;
  englishLevel: EnglishLevel | null;

  // Образование и опыт
  education: string | null;
  experience: ExperienceLevel | null;

  // Стэк (связи многие-ко-многим)
  programmingLanguages: ProgrammingLanguage[];
  frameworks: Framework[];
  tools: Tool[];

  // Контакты
  telegram: string | null;
  github: string | null;
  discord: string | null;

  // Авторизация через соц.сети
  provider: string | null;
  providerId: string | null;

  createdAt: Date;
  updatedAt: Date;
}

export type SafeUser = Omit<User, 'password'>;

interface UseUserReturn {
  user: SafeUser | null;  // Используем SafeUser без пароля
  isLoading: boolean;
  error: Error | null;
  // logout: () => Promise<void>;
  // refreshUser: () => Promise<void>;
  // updateUser: (data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'password'>>) => Promise<void>;
  // isAuthenticated: boolean;
}

const TEST_TOKEN = 'TEST';

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = TEST_TOKEN;

      if (!token) {
        setUser(null);
        return;
      }
    }
  }

  return {
    user,
    isLoading
  };
}
