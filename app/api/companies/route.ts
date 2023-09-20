import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const companies = await prisma.company.findMany({
    select: { id: true, name: true, description: true, sector: true },
  });

  return NextResponse.json(companies, { status: 200 });
}
