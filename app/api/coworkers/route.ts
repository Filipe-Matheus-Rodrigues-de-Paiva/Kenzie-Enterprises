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

  if (!loggedUser.department_uuid) {
    return new NextResponse(
      JSON.stringify({ detail: 'usuário sem departamento' })
    );
  }

  const departmentFound = await prisma.department.findUnique({
    where: { id: loggedUser.department_uuid },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          professional_level: true,
          kind_of_work: true,
          department_uuid: true,
        },
      },
      company: true,
    },
  });

  if (!departmentFound) throw new Error('Departamento não encontrado');

  return NextResponse.json(departmentFound, { status: 200 });
}
