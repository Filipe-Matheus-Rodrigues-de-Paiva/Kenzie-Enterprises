import { prisma } from '@/app/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function GET(req: any) {
  const token = await getToken({ req });

  if (!token || !token.sub) {
    throw new Error(`${token?.email}`);
  }

  const loggedUser = await prisma.user.findUnique({
    where: { id: token.sub },
  });

  return NextResponse.json(loggedUser, { status: 200 });
}
