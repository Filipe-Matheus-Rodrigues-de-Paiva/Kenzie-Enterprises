'use client';

import { EyeIcon } from 'lucide-react';
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useEffect, useState } from 'react';
import {
  IDepartment,
  IUser,
  IUserOutOfWork,
} from '@/app/(dashboard)/admin/page';
import { Form, FormControl, FormMessage, FormItem, FormField } from './ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from './ui/use-toast';

interface IProps {
  department: IDepartment;
  users: IUser[];
  usersOutOfWork: IUserOutOfWork[];
  token: string | undefined;
}

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://kenzie-enterprises-ten.vercel.app';

const formSchema = z.object({
  user_uuid: z.string().nonempty(),
  department_uuid: z.string().nonempty(),
});

export default function ReviewDepartmentModal({
  department,
  users,
  usersOutOfWork,
  token,
}: IProps) {
  const [open, setIsOpen] = useState(false);
  const [mounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const departmentName = department.name;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_uuid: '',
      department_uuid: '',
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mounted) return null;

  async function submit() {
    setIsLoading(true);
    try {
      const userUuid = form.getValues('user_uuid');
      const departmentUuid = department.id;

      if (userUuid && departmentUuid) {
        await axios.patch(
          `${baseUrl}/api/admin/hire`,
          {
            user_uuid: userUuid,
            department_uuid: departmentUuid,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast({
          description: 'Usuário contratado com sucesso!',
        });

        // revalidar Out of workers
        // revalidar users
      }
    } catch (error) {
      toast({
        title: 'O seguinte erro ocorreu:',
        description: `${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function dismissEmployee(id: string) {
    setIsLoading(true);
    try {
      await axios.patch(`${baseUrl}/api/admin/dismiss/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        description: 'Funcionário demitido com sucesso!',
        style: { backgroundColor: 'green', color: 'white' },
      });

      // out of work e users - revalidar
    } catch (error) {
      toast({
        title: 'O seguinte erro aconteceu:',
        description: `${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const hiredFolks = users.filter(
    (user) =>
      user.department_uuid !== null && user.department?.name === departmentName
  );

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <EyeIcon className="absolute right-5 top-8 text-blue-600 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:w-[425px] p-8">
        <DialogHeader>
          <DialogTitle className="text-black mb-4">
            {department.name}
          </DialogTitle>
          <DialogDescription>{department.description}</DialogDescription>
          <DialogDescription>{department.company.name}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="flex gap-3 justify-between">
            <FormField
              control={form.control}
              name="user_uuid"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10 rounded-none mb-4">
                        <SelectValue placeholder="Selecione um usuário" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Usuários</SelectLabel>
                        {usersOutOfWork.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={'secondary'}
              onClick={submit}
              className="bg-green-400"
              disabled={isLoading}
            >
              Contratar
            </Button>
          </form>
        </Form>
        <div className="bg-[#f8f8f8] flex gap-3 h-64 w-full items-center pl-2 overflow-x-auto">
          {hiredFolks.length > 0 ? (
            hiredFolks.map((employee) => {
              return (
                <div
                  key={employee.id}
                  className="flex flex-col gap-2 bg-white h-5/6 border-b-2 min-w-[170px] relative p-5 border-[#4200ff]"
                >
                  <h1 className="text-black text-center text-xl font-bold">
                    {employee.name}
                  </h1>
                  <h1 className="text-black text-center text-xl">
                    {department.company.name}
                  </h1>
                  <Button
                    variant={'destructive'}
                    className="w-11/12 self-center absolute bottom-2"
                    disabled={isLoading}
                    onClick={() => dismissEmployee(employee.id)}
                  >
                    Desligar
                  </Button>
                </div>
              );
            })
          ) : (
            <h1 className="text-black m-auto">Nenhuma contratação ainda</h1>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
