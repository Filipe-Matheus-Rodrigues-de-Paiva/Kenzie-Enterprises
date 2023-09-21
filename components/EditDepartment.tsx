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
import { Textarea } from './ui/textarea';
import { Edit2Icon } from 'lucide-react';
import { IDepartment } from '@/app/(dashboard)/admin/page';

interface IProps {
  token: string | undefined;
  department: IDepartment;
}

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://kenzie-enterprises-sigma.vercel.app';

const formSchema = z.object({
  description: z.string().nonempty('Campo obrigatório'),
});

export default function CreateDepartmentModal({ token, department }: IProps) {
  const [mounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mounted) return null;

  async function submit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      await axios.patch(
        `${baseUrl}/api/admin/departments/${department.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: 'Departamento editado com sucesso',
      });

      // revalidar departamentos
    } catch (error) {
      toast({
        title: 'Algum erro aconteceu',
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
          <DialogTitle>Editar Departamento</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Digite aqui a descrição do departamento"
                      className="rounded-none mb-4"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
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
