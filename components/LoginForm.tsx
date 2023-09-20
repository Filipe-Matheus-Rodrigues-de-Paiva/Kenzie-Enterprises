'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import GetUserInfo from '@/app/user';

const formSchema = z.object({
  email: z
    .string({ required_error: 'Please enter an email!' })
    .email({ message: 'Use a valid email address!' })
    .min(10)
    .max(100),
  password: z.string().nonempty({ message: 'Please enter a password!' }),
});

export default function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const id = await GetUserInfo(values.email);

    signIn('credentials', {
      ...values,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast({ title: 'Credenciais não correspondem a usuário ativo!' });
        }

        if (callback?.ok && !callback.error) {
          toast({ title: 'Bem vindo, novamente' });
          if (values.email === 'admin@mail.com') {
            router.push('/admin');
          } else {
            router.push(`/common/${id}`);
          }
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <Form {...form}>
      <div className="bg-[#FFFFFFF2] w-full flex flex-col gap-4 items-center absolute top-[25%] py-3 max-w-lg">
        <h2 className="self-start pl-4 font-extrabold text-3xl">Login</h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-[95%]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Seu email"
                    disabled={isLoading}
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
                    placeholder="Sua senha"
                    type="password"
                    disabled={isLoading}
                    className="h-12 rounded-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            className="rounded-none h-14 bg-white text-blue-700 font-extrabold border-[#4200ff] border-2 hover:bg-blue-800 hover:text-white hover:font-bold"
          >
            {isLoading ? '...' : 'Login'}
          </Button>
        </form>
        <pre>ou</pre>
        <Button
          className="w-[95%] rounded-none h-14 bg-white text-blue-700 font-extrabold border-[#4200ff] border-2 hover:bg-blue-800 hover:text-white hover:font-bold"
          onClick={() => router.push('/register')}
        >
          Cadastre-se
        </Button>
      </div>
    </Form>
  );
}
