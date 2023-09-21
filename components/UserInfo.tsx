'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Edit } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import axios from 'axios';
import { toast } from './ui/use-toast';
import { IUserInfo } from '@/app/(dashboard)/common/[id]/page';
import { revalidateUserInfo } from '@/app/actions';

interface IProps {
  userInfo: IUserInfo;
  token: string | undefined;
}

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
});

export default function UserInfo({ userInfo, token }: IProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://kenzie-enterprises-sigma.vercel.app';

  async function submit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await axios.patch(`${baseUrl}/api/users`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        title: 'dados atualizados com sucesso',
      });

      // revalidar userInfo
      revalidateUserInfo();
    } catch (error) {
      toast({
        title: 'o seguinte erro aconteceu:',
        description: 'Insira pelo menos um campo!',
      });
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  }

  return (
    <div className="relative flex flex-col pl-3 pt-3 gap-2 top-10 w-[82%] h-32 shadow-2xl border-gray-500 border">
      <h1 className="sm:text-3xl font-extrabold">{userInfo.name}</h1>
      <div className="sm:flex sm:absolute sm:bottom-4 sm:gap-16 md:gap-24 lg:gap-48">
        <h3 className="sm:text-lg xl:text-3xl">Email: {userInfo.email}</h3>
        <h3 className="sm:text-lg xl:text-3xl">
          {userInfo.professional_level}
        </h3>
        <h3 className="sm:text-lg xl:text-3xl">{userInfo.kind_of_work}</h3>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Edit
            className="cursor-pointer absolute right-4 top-1 h-11"
            color="blue"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-[#1f3966]">
          <DialogHeader>
            <DialogTitle>Edite perfil</DialogTitle>
            <DialogDescription className="text-slate-300">
              Faça mudanças no seu perfil e depois as salve
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Seu nome"
                        disabled={isLoading}
                        className="h-12 rounded-none mb-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Seu email"
                        disabled={isLoading}
                        className="h-12 rounded-none mb-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Sua senha"
                        type="password"
                        disabled={isLoading}
                        className="h-12 rounded-none mb-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button disabled={isLoading}>Salvar mudanças</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
