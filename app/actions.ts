'use server';

import { revalidatePath } from 'next/cache';

export function revalidateDepartments() {
  return revalidatePath('/api/admin/departments');
}

export async function revalidateOutOfWorkUsers() {
  return revalidatePath('/api/admin/hire/out-of-work');
}

export function revalidateUsers() {
  return revalidatePath('/api/admin/users');
}

export function revalidateUserInfo() {
  return revalidatePath('/api/token');
}
