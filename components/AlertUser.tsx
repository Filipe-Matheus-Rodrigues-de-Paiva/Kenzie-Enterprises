'use client';

import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { IUser } from '@/app/(dashboard)/admin/page';
import axios from 'axios';
import { toast } from './ui/use-toast';

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://kenzie-enterprises-ten.vercel.app';

export default function AlertUser({
  user,
  token,
}: {
  user: IUser;
  token: string | undefined;
}) {
  async function deleteUser() {
    try {
      await axios.delete(`${baseUrl}/api/admin/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        description: 'Usuário removido com sucesso!',
        style: {
          color: 'white',
          backgroundColor: 'green',
          fontWeight: 'bolder',
        },
      });

      // revalidar users
    } catch (error) {
      toast({
        title: 'O seguinte erro aconteceu:',
        description: `${error}`,
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2 className="absolute right-5 bottom-6 text-red-600" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-black">
            Tem certeza?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-lg">
            Realmente deseja remover o usuário {user.name}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteUser}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
