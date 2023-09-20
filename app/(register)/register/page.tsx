/* eslint-disable @next/next/no-img-element */
import RegisterForm from '@/components/RegisterForm';

export default function Register() {
  return (
    <main className="h-full flex justify-center relative">
      <img
        src={'/Rectangle 7.svg'}
        alt=""
        className="w-full h-full object-cover"
      />
      <RegisterForm />
    </main>
  );
}
