import { Button } from './ui/button';
import Dropdown from './DropdownMenu';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-center h-16 border-b-2 border-gray-500 fixed w-full z-10 bg-white">
      <div className="flex justify-between items-center w-full px-2 md:w-5/6">
        <h1 className="h-fit w-fit font-bold flex items-center gap-2">
          <span className="border-2 border-black bg-purple-600 w-3 h-3 rounded-[100%]"></span>
          Kenzie Empresas
        </h1>
        <div className="hidden md:flex md:gap-3">
          <Button
            variant={'ghost'}
            asChild
            className="border-[#4200ff] border-2 bg-white text-blue-700 w-full font-semibold hover:bg-blue-800 hover:text-white hover:font-bold"
          >
            <Link href={'/'}>Home</Link>
          </Button>
          <Button
            variant={'ghost'}
            asChild
            className="border-[#4200ff] border-2 bg-white text-blue-700 w-full font-semibold hover:bg-blue-800 hover:text-white hover:font-bold"
          >
            <Link href={'/register'}>Cadastro</Link>
          </Button>
          <Button
            variant={'ghost'}
            asChild
            className="border-[#4200ff] border-2 bg-white text-blue-700 w-full font-semibold hover:bg-blue-800 hover:text-white hover:font-bold"
          >
            <Link href={'/login'}>Login</Link>
          </Button>
        </div>
        <Button variant={'ghost'} size={'icon'} className="md:hidden">
          <Dropdown />
        </Button>
      </div>
    </header>
  );
}
