import { prisma } from '@/app/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await getToken({ req });
  const payload = await req.json();

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

  const employee = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!employee) {
    throw new Error('Empregado não encontrado');
  }

  const updateData = {
    kind_of_work: employee.kind_of_work,
    professional_level: employee.professional_level,
  };

  if (payload.kind_of_work !== '') {
    updateData.kind_of_work = payload.kind_of_work;
  }

  if (payload.professional_level !== '') {
    updateData.professional_level = payload.professional_level;
  }

  const updatedUserJobStatus = await prisma.user.update({
    where: { id: params.id },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      professional_level: true,
      kind_of_work: true,
      department_uuid: true,
    },
  });

  return NextResponse.json(updatedUserJobStatus, { status: 200 });
}

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

  await prisma.user.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ status: 204 });
}
