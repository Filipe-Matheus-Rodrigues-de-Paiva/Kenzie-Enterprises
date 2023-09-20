'use client';

import { signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

export default function HeaderTwo() {
  const signOutHandler = () => {
    toast({ title: `Até a próxima` });
    signOut({ redirect: true, callbackUrl: '/login' });
  };
  return (
    <header className="flex items-center justify-center h-16 border-b-2 w-full border-gray-500 sticky z-10 top-0 bg-slate-50">
      <div className="flex justify-between items-center w-5/6 px-2">
        <h1 className="h-fit w-fit font-bold flex items-center gap-2 text-black">
          <span className="border-2 border-black bg-purple-600 w-3 h-3 rounded-[100%]"></span>
          Kenzie Empresas
        </h1>
        <Button
          variant={'outline'}
          className="border-[#4200ff] rounded-none sm:w-[142px]"
          onClick={signOutHandler}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
