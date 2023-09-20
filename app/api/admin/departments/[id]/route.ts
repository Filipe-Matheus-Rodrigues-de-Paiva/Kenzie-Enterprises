import { prisma } from '@/app/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

  await prisma.department.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ status: 204 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await getToken({ req });
  const payload = await req.json();
  const { description } = payload;

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

  const updatedDepartment = await prisma.department.update({
    where: { id: params.id },
    data: {
      description: description,
    },
  });

  if (!updatedDepartment) throw new Error('Departamento não encontrado');

  return NextResponse.json(updatedDepartment, { status: 200 });
}

function isValidUUID(uuidStr: string) {
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return uuidPattern.test(uuidStr);
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

  const foundDepartments = await prisma.department.findMany({
    where: {
      company: {
        id: params.id,
      },
    },
    include: { company: true },
  });

  if (!foundDepartments || !isValidUUID(params.id))
    throw new Error('Nenhum departamento encontrado');

  return NextResponse.json(foundDepartments, { status: 200 });
}
