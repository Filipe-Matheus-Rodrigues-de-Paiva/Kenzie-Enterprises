import AdminSelectCompanies from '@/components/AdminSelectCompanies';
import AlertUser from '@/components/AlertUser';
import EditUserModal from '@/components/EditUserModal';
import { cookies } from 'next/headers';

export interface IUser {
  id: string;
  email: string;
  name: string | null;
  professional_level: string;
  kind_of_work: string | null;
  department_uuid: string | null;
  department: IDepartment | null;
}

export interface IUserOutOfWork {
  id: string;
  name: string;
  email: string;
  professional_level: string;
  kind_of_work: string;
  department_uuid: string;
}

export interface ICompany {
  id: string;
  name: string;
  description: string;
  sector_uuid: string;
}

export interface IDepartment {
  id: string;
  name: string;
  description: string;
  company: ICompany;
}

async function getAllUsers() {
  const token = cookies().get('next-auth.session-token');
  const requestHeaders = {
    Authorization: `Bearer ${token?.value}`,
  };

  const users = await fetch('127.0.0.1:3000/api/admin/users', {
    headers: requestHeaders,
  });

  if (!users.ok) {
    throw new Error('Erro ao buscar dados');
  }

  return await users.json();
}

async function getAllUsersOutOfWork() {
  const token = cookies().get('next-auth.session-token');
  const requestHeaders = {
    Authorization: `Bearer ${token?.value}`,
  };

  const users = await fetch('127.0.0.1:3000/api/admin/hire/out-of-work', {
    headers: requestHeaders,
  });

  if (!users.ok) {
    throw new Error('Erro ao buscar dados');
  }

  return await users.json();
}

async function getAllDepartments() {
  const token = cookies().get('next-auth.session-token');
  const requestHeaders = {
    Authorization: `Bearer ${token?.value}`,
  };

  const response = await fetch('127.0.0.1:3000/api/admin/departments', {
    headers: requestHeaders,
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar dados');
  }

  return await response.json();
}

async function getAllCompanies() {
  const response = await fetch('127.0.0.1:3000/api/companies');

  if (!response.ok) {
    throw new Error('Erro ao buscar dados');
  }

  return await response.json();
}

export default async function AdminPage() {
  const users: IUser[] = await getAllUsers();
  const departments: IDepartment[] = await getAllDepartments();
  const token = cookies().get('next-auth.session-token')?.value;
  const usersOutOfWork: IUserOutOfWork[] = await getAllUsersOutOfWork();
  const companies: ICompany[] = await getAllCompanies();

  return (
    <main className="w-full h-fit flex relative flex-col gap-10 items-center border-2 border-black bg-[#1c2c45]">
      <AdminSelectCompanies
        companies={companies}
        token={token}
        departments={departments}
        users={users}
        usersOutOfWork={usersOutOfWork}
      />
      <h1 className="text-3xl">Usuários Cadastrados</h1>
      <div className="w-[82%] h-96 shadow-blue-400 shadow-2xl rounded mb-9 overflow-y-auto grid sm:grid-cols-2 lg:grid-cols-3 p-7 gap-x-8 gap-y-6 bg-[#3c5d93]">
        {users.map((user) => {
          return (
            <div
              className="h-32 relative bg-slate-100 border-[#4200ff] border-2 pl-4 pt-4"
              key={user.id}
            >
              <p className="font-bold text-xl mb-2">{user.name}</p>
              <p className="text-xl mb-2">{user.professional_level}</p>
              <p>{user.kind_of_work}</p>
              <EditUserModal token={token} user={user} />
              <AlertUser token={token} user={user} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
