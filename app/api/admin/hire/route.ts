import { prisma } from '@/app/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

function isValidUUID(uuidStr: string) {
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return uuidPattern.test(uuidStr);
}

export async function PATCH(req: NextRequest) {
  const payload = await req.json();

  if (!payload) throw Error('Insira os dados da requisição');

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

  /* Lógica de colocar um departamento_uuid para um usuário */

  const { user_uuid, department_uuid } = payload;

  if (!isValidUUID(user_uuid) || !isValidUUID(department_uuid)) {
    throw new Error('Uuids não válidos');
  }

  const foundDepartment = await prisma.department.findUnique({
    where: { id: String(department_uuid) },
  });

  if (!foundDepartment) throw new Error('Departamento não encontrado');

  const updatedUser = await prisma.user.update({
    where: { id: user_uuid },
    data: {
      department_uuid: foundDepartment.id,
    },
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
