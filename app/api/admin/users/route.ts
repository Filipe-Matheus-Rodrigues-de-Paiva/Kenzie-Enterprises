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

  if (loggedUser.is_superuser) {
    const users = await prisma.user.findMany({
      where: { is_superuser: false },
      select: {
        id: true,
        email: true,
        name: true,
        professional_level: true,
        kind_of_work: true,
        department_uuid: true,
        department: true,
      },
      orderBy: { kind_of_work: 'asc' },
    });

    return NextResponse.json(users, { status: 200 });
  } else {
    throw new Error('Sem permissão suficiente');
  }
}
