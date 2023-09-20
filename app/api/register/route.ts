import { prisma } from '@/app/lib/prisma';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const payload = await request.json();
  const { name, email, password, professional_level }: any = payload;

  if (!name || !email || !password) {
    return new NextResponse('Há campos faltando', { status: 400 });
  }

  const existUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existUser) throw new Error('Usuário já existe');

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: await hash(password, 10),
      professional_level: professional_level,
      department_uuid: null,
      kind_of_work: null,
    },
  });

  const responseFormatted = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    professional_level: newUser.professional_level,
    kind_of_work: newUser.kind_of_work,
    department_uuid: newUser.department_uuid,
    is_superuser: newUser.is_superuser,
  };

  return NextResponse.json(responseFormatted, { status: 200 });
}
