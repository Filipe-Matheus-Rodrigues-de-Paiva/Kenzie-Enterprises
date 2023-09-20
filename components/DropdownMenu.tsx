'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Dropdown() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[320px] shadow-lg flex flex-col justify-center">
        <DropdownMenuItem>
          <Button
            asChild
            variant={'outline'}
            className="bg-white text-blue-700 w-full font-semibold hover:bg-blue-800 hover:text-white hover:font-bold"
          >
            <Link href={'/login'}>Login</Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            asChild
            variant={'outline'}
            className="bg-white text-blue-700 w-full font-semibold hover:bg-blue-800 hover:text-white hover:font-bold"
          >
            <Link href={'/register'}>Register</Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            asChild
            variant={'outline'}
            className="bg-white text-blue-700 w-full font-semibold hover:bg-blue-800 hover:text-white hover:font-bold"
          >
            <Link href={'/'}>Home</Link>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
