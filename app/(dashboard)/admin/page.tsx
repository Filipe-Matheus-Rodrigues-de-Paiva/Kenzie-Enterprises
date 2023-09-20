import AdminSelectCompanies from '@/components/AdminSelectCompanies';
import AlertUser from '@/components/AlertUser';
import EditUserModal from '@/components/EditUserModal';
import { cookies } from 'next/headers';

export interface IUser {
  id: string;
  email: string;
  name: string;
  professional_level: string;
  kind_of_work: string | null;
  department_uuid: string | null;
  department: IDepartment;
}

export interface IUserOutOfWork {
  id: string;
  name: string;
  email: string;
  professional_level: string;
  kind_of_work: string;
  department_uuid: string;
}

interface ISector {
  id: string;
  description: string;
}

export interface ICompany {
  id: string;
  name: string;
  description: string;
  sector: ISector;
}

export interface IDepartment {
  id: string;
  name: string;
  description: string;
  company: {
    id: string;
    name: string;
    description: string;
    sector_uuid: string;
  };
}

async function getAllUsers(): Promise<IUser[]> {
  const token = cookies().get('next-auth.session-token');
  const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token?.value}`,
  };

  const users = await fetch('127.0.0.1/api/admin/users', {
    headers: requestHeaders,
  }).then((res) => res.json());

  await new Promise((r) => {
    setTimeout(r, 2000);
  });

  return users;
}

async function getAllUsersOutOfWork() {
  const token = cookies().get('next-auth.session-token');
  const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token?.value}`,
  };

  const users = await fetch('127.0.0.1/api/admin/hire/out-of-work', {
    headers: requestHeaders,
  }).then((res) => res.json());

  return users;
}

async function getAllDepartments() {
  const token = cookies().get('next-auth.session-token');
  const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token?.value}`,
  };

  const departments = await fetch('127.0.0.1/api/admin/departments', {
    headers: requestHeaders,
  }).then((res) => res.json());

  await new Promise((r) => {
    setTimeout(r, 2000);
  });

  return departments;
}

async function getAllCompanies() {
  const companies = await fetch('127.0.0.1/api/companies').then((res) =>
    res.json()
  );

  return companies;
}

export default async function AdminPage() {
  const companies: ICompany[] = await getAllCompanies();
  const users = await getAllUsers();
  const departments: IDepartment[] = await getAllDepartments();
  const token = cookies().get('next-auth.session-token')?.value;
  const usersOutOfWork: IUserOutOfWork[] = await getAllUsersOutOfWork();

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
