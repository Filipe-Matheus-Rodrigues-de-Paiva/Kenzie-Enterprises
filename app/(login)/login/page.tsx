/* eslint-disable @next/next/no-img-element */
import { prisma } from '@/app/lib/prisma';
import LoginForm from '@/components/LoginForm';

export default async function Login() {
  const users = await prisma.user.findMany();

  return (
    <main className="h-full flex justify-center relative">
      <img
        src={'/Rectangle 7.svg'}
        alt=""
        className="w-full h-full object-cover"
      />
      <LoginForm users={users} />
    </main>
  );
}
