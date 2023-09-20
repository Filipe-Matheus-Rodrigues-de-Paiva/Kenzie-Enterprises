/* eslint-disable @next/next/no-img-element */
import LoginForm from '@/components/LoginForm';

export default async function Login() {
  return (
    <main className="h-full flex justify-center relative">
      <img
        src={'/Rectangle 7.svg'}
        alt=""
        className="w-full h-full object-cover"
      />
      <LoginForm />
    </main>
  );
}
