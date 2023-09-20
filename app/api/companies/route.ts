import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const companies = await prisma.company.findMany();

  return NextResponse.json(companies, { status: 200 });
}
