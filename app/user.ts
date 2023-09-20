'use server';

import { prisma } from './lib/prisma';

async function GetUserInfo(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) return null;

  return user.id;
}

export default GetUserInfo;
