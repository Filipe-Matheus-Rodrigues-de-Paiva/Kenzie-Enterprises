'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateDepartments() {
  return revalidatePath('/api/admin/departments');
}

export async function revalidateOutOfWorkUsers() {
  return revalidatePath('/api/admin/hire/out-of-work');
}

export async function revalidateUsers() {
  return revalidatePath('/api/admin/users');
}

export async function revalidateUserInfo() {
  return revalidatePath('/api/token');
}
