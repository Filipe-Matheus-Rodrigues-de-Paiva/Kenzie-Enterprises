import { prisma } from '@/app/lib/prisma';
import { AuthOptions, getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(
  req: any,
  res: any,
  authOptions: AuthOptions,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(req, res, authOptions);

  // eslint-disable-next-line no-console
  console.log(session);

  if (session) {
    const loggedUser = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        professional_level: true,
        kind_of_work: true,
        department_uuid: true,
        is_superuser: true,
      },
    });
    return NextResponse.json(loggedUser, { status: 200 });
  } else {
    throw new Error('Usuário não autenticado!');
  }
}
