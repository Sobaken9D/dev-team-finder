// профиль - приватная страница
// т.е переход по http://localhost:3000/profile должен быть закрыт (приватен)

import {auth} from '@/configs/auth';

export default async function ProfilePage() {
  const session = await auth();
  console.log(session);
  return (
    <div>Hi {session?.user?.email}</div>
  );
};