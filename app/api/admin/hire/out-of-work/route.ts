import { prisma } from '@/app/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token || !token.sub) {
    throw new Error('Usuário não autenticado');
  }

  const loggedUser = await prisma.user.findUnique({
    where: {
      id: token.sub,
    },
  });

  if (!loggedUser) {
    throw new Error('Usuário não autenticado');
  }

  if (!loggedUser.is_superuser) throw new Error('Sem permissão suficiente');

  const usersOutOfWork = await prisma.user.findMany({
    where: { department_uuid: null, is_superuser: false },
    select: {
      id: true,
      name: true,
      email: true,
      professional_level: true,
      kind_of_work: true,
      department_uuid: true,
    },
  });

  return NextResponse.json(usersOutOfWork, { status: 200 });
}
