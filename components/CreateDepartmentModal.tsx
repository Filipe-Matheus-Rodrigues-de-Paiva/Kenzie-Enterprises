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
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ICompany } from '@/app/(dashboard)/admin/page';

interface IProps {
  token: string | undefined;
  companies: ICompany[];
}

const formSchema = z.object({
  name: z.string().nonempty('Campo obrigatório'),
  description: z.string().nonempty('Campo obrigatório'),
  company_uuid: z.string().nonempty('Escolha uma empresa'),
});

export default function CreateDepartmentModal({ token, companies }: IProps) {
  const [mounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      company_uuid: '',
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mounted) return null;

  async function submit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      await axios.post(
        'http://localhost:3000/api/admin/departments/create',
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: 'Departamento criado com sucesso',
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
        <Button
          variant={'secondary'}
          className="bg-[#4200ff] text-white absolute right-0 hover:bg-[#5030a7]"
        >
          + Criar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[425px] p-8 bg-[#1f3966]">
        <DialogHeader>
          <DialogTitle>Criar Departamento</DialogTitle>
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
                      disabled={isLoading}
                      placeholder="Digite o nome do departamento"
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
            <FormField
              control={form.control}
              name="company_uuid"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-none mb-4">
                        <SelectValue
                          placeholder="Selecione uma empresa"
                          className="text-black"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companies.map((company) => {
                        return (
                          <SelectItem
                            key={company.id}
                            className="h-6"
                            value={company.name}
                          >
                            {company.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button>Criar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
