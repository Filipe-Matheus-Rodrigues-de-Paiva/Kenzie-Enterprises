import { prisma } from '@/app/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token || !token.email) {
    throw new Error('Usuário não autenticado');
  }

  const loggedUser = await prisma.user.findUnique({
    where: {
      email: token.email,
    },
  });

  if (!loggedUser) {
    return NextResponse.json({ detail: 'Usuário não logado' }, { status: 200 });
  }

  const responseFormat = {
    id: loggedUser?.id,
    name: loggedUser?.name,
    email: loggedUser?.email,
    professional_level: loggedUser?.professional_level,
    kind_of_work: loggedUser?.kind_of_work,
    department_uuid: loggedUser?.department_uuid,
    is_superuser: loggedUser?.is_superuser,
  };

  return NextResponse.json(responseFormat, { status: 200 });
}
