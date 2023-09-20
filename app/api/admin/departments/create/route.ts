import { prisma } from '@/app/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const { name, description, company_uuid }: any = payload;
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

  const foundCompany = await prisma.company.findUnique({
    where: {
      name: company_uuid,
    },
  });

  if (!foundCompany) throw new Error('Empresa não encontrada');

  const newDepartment = await prisma.department.create({
    data: {
      name,
      description,
      companyId: foundCompany.id,
    },
  });

  return NextResponse.json(newDepartment, { status: 200 });
}
