'use client';

import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { toast } from './ui/use-toast';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Edit2Icon } from 'lucide-react';
import { IUser } from '@/app/(dashboard)/admin/page';

interface IProps {
  token: string | undefined;
  user: IUser;
}

const formSchema = z.object({
  kind_of_work: z
    .enum(['Home Office', 'Presencial', 'Híbrido'])
    .default('Presencial'),
  professional_level: z.enum(['Júnior', 'Pleno', 'Sênior']).default('Júnior'),
});

export default function EditUserModal({ token, user }: IProps) {
  const [mounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kind_of_work: 'Presencial',
      professional_level: 'Júnior',
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mounted) return null;

  async function submit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      await axios.patch(`/api/admin/users/${user.id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Revalidar a rota que pega todos os usuários
      toast({
        description: 'Usuário editado com sucesso',
      });
    } catch (error) {
      toast({
        title: 'Algum erro aconteceu:',
        description: `${error}`,
      });
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      form.reset();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Edit2Icon className="absolute cursor-pointer right-5 bottom-20 text-yellow-400" />
      </DialogTrigger>
      <DialogContent className="sm:w-[425px] p-8 bg-[#1f3966]">
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <FormField
              control={form.control}
              name="kind_of_work"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-none mb-4">
                        <SelectValue placeholder="Selecionar modalidade de trabalho" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Modalidades de trabalho</SelectLabel>
                        <SelectItem value="Presencial" className="h-6">
                          Presencial
                        </SelectItem>
                        <SelectItem value="Híbrido" className="h-6">
                          Híbrido
                        </SelectItem>
                        <SelectItem value="Home Office" className="h-6">
                          Home Office
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="professional_level"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-none mb-4">
                        <SelectValue placeholder="Selecionar nível profissional" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Nível profissional</SelectLabel>
                        <SelectItem value="Júnior" className="h-6">
                          Júnior
                        </SelectItem>
                        <SelectItem value="Pleno" className="h-6">
                          Pleno
                        </SelectItem>
                        <SelectItem value="Sênior" className="h-6">
                          Sênior
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={isLoading}>Editar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
