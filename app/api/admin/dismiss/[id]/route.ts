import { prisma } from '@/app/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

function isValidUUID(uuidStr: string) {
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return uuidPattern.test(uuidStr);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const payload = await req.json();

  if (!payload) throw new Error('Insira os dados da requisição');

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

  const foundUser = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!foundUser) throw new Error('Usuário não encontrado');

  const updatedUser = await prisma.user.update({
    where: { id: foundUser.id },
    data: { department_uuid: null },
    select: {
      id: true,
      name: true,
      email: true,
      professional_level: true,
      kind_of_work: true,
      department_uuid: true,
    },
  });

  return NextResponse.json(updatedUser, { status: 200 });
}
