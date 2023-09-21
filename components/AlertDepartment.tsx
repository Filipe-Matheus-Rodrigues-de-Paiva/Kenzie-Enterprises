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
import { IDepartment } from '@/app/(dashboard)/admin/page';
import axios from 'axios';
import { toast } from './ui/use-toast';

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://kenzie-enterprises-sigma.vercel.app';

interface IProps {
  department: IDepartment;
  token: string | undefined;
}

export default function AlertDepartment({ department, token }: IProps) {
  async function deleteDepartment() {
    try {
      await axios.delete(`${baseUrl}/api/admin/departments/${department.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        description: 'Departamento excluído com sucesso!',
        style: { backgroundColor: 'green', color: 'white' },
      });

      // Revalidar Outofworkers, users, departments
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
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. O departamento de {department.name}{' '}
            será removido e seus funcionários demitidos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteDepartment}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
