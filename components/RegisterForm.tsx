'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useState } from 'react';
import { ToastAction } from './ui/toast';

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://kenzie-enterprises-sigma.vercel.app';

const formSchema = z.object({
  name: z.string().nonempty('Please enter your name').max(50),
  email: z
    .string({ required_error: 'Please enter an email!' })
    .email({ message: 'Use a valid email address!' })
    .min(10)
    .max(100),
  password: z.string().nonempty({ message: 'Please enter a password' }),
  professional_level: z.enum(['Júnior', 'Pleno', 'Sênior']).default('Júnior'),
});

export default function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      professional_level: 'Júnior',
    },
  });

  const router = useRouter();

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await axios.post(`${baseUrl}/api/register`, values);

      toast({
        title: 'Conta cadastrada com sucesso!',
        action: (
          <ToastAction
            altText="Ir para login"
            onClick={() => router.push('/login')}
          >
            Ir para Login
          </ToastAction>
        ),
      });
    } catch (error) {
      toast({
        title: 'O seguinte erro ocorreu:',
        description: 'Usuário ja existe!',
      });
    } finally {
      setIsLoading(false);
      form.reset({ email: '', name: '', password: '' });
    }
  }

  return (
    <Form {...form}>
      <div className="bg-[#FFFFFFF2] w-full flex flex-col gap-4 items-center absolute top-[20%] py-3 max-w-lg">
        <h2 className="self-start pl-4 font-extrabold text-3xl">Cadastre-se</h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-[95%]"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Seu nome"
                    className="h-12 rounded-none"
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
                    className="h-12 rounded-none"
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
                    type="password"
                    placeholder="Sua senha"
                    className="h-12 rounded-none"
                    {...field}
                  />
                </FormControl>
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
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um nível profissional" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Júnior">Júnior</SelectItem>
                    <SelectItem value="Pleno">Pleno</SelectItem>
                    <SelectItem value="Sênior">Sênior</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            className="rounded-none h-14 bg-white text-blue-700 font-extrabold border-[#4200ff] border-2 hover:bg-blue-800 hover:text-white hover:font-bold"
          >
            {isLoading ? '...' : 'Cadastre-se'}
          </Button>
        </form>
        <Button
          className="w-[95%] rounded-none h-14 bg-white text-blue-700 font-extrabold border-[#4200ff] border-2 hover:bg-blue-800 hover:text-white hover:font-bold"
          onClick={() => router.push('/')}
        >
          Retornar
        </Button>
      </div>
    </Form>
  );
}
