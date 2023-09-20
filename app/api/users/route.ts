import { prisma } from '@/app/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';

export async function PATCH(req: NextRequest) {
  const token = await getToken({ req });
  const payload = await req.json();

  if (!token) {
    throw new Error('Usuário não está autenticado');
  }

  // Obtenha o usuário atual para ter os valores atuais
  const currentUser = await prisma.user.findUnique({
    where: { id: token.sub },
  });

  if (!currentUser) {
    throw new Error('Usuário não encontrado');
  }

  const updateData = {
    name: currentUser.name,
    email: currentUser.email,
    password: currentUser.password,
  };

  if (payload.name !== '') {
    updateData.name = payload.name;
  }

  if (payload.email !== '') {
    updateData.email = payload.email;
  }

  if (payload.password !== '') {
    updateData.password = await hash(payload.password, 10);
  }

  // Check if any fields were provided for update
  if (
    updateData.name === currentUser.name &&
    updateData.email === currentUser.email &&
    updateData.password === currentUser.password
  ) {
    throw new Error('Insira pelo menos um campo');
  }

  // Atualizar usuário
  const updatedUser = await prisma.user.update({
    where: { id: token.sub },
    data: updateData,
  });

  const responseFormatted = {
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    professional_level: updatedUser.professional_level,
    kind_of_work: updatedUser.kind_of_work,
    department_uuid: updatedUser.department_uuid,
  };

  return NextResponse.json(responseFormatted, { status: 200 });
}
