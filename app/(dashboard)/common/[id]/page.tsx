import { prisma } from '@/app/lib/prisma';
import UserInfo from '@/components/UserInfo';
import { cookies } from 'next/headers';

export interface IUserInfo {
  id: string;
  name: string;
  email: string;
  professional_level: string;
  kind_of_work: string | null;
  department_uuid: string | null;
}

interface IUser {
  id: string;
  name: string | null;
  professional_level: string;
  kind_of_work: string | null;
  department_uuid: string | null;
}

interface ICoworkers {
  id: string;
  name: string;
  description: string;
  companyId: string;
  users: IUser[];
  company: {
    id: string;
    name: string;
    description: string;
    sector_uuid: string;
  };
}

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? '127.0.0.1:3000'
    : 'https://kenzie-enterprises-ten.vercel.app';

const realCookieName =
  process.env.NODE_ENV === 'development'
    ? '__Secure-next-auth.session-token'
    : 'next-auth.session-token';

async function getUserInfo(): Promise<IUserInfo> {
  const token = cookies().get(realCookieName);
  const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token?.value}`,
  };

  const userInfo = await fetch(`${baseUrl}/api/token`, {
    headers: requestHeaders,
  }).then((res) => res.json());

  return userInfo;
}

async function getCoworkers() {
  const token = cookies().get(realCookieName);
  const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token?.value}`,
  };

  const department = await fetch(`${baseUrl}/api/coworkers`, {
    headers: requestHeaders,
  }).then((res) => res.json());

  return department;
}

export const validate = 60;

export async function generateStaticParams() {
  const users = await prisma.user.findMany();

  return users.map((user) => ({
    id: user.id,
  }));
}

export default async function CommonUserPage() {
  const userInfo = await getUserInfo();
  const departmentFound: ICoworkers = await getCoworkers();
  const token = cookies().get(realCookieName)?.value;

  return (
    <main className="w-full h-full relative flex flex-col items-center bg-[#1c2c45]">
      <UserInfo userInfo={userInfo} token={token} />
      {userInfo.department_uuid !== null && (
        <div className="absolute top-48 flex items-center text-center justify-center h-12 w-[82%] bg-blue-400">
          <h1 className="sm:text-xl">
            {departmentFound.company.name} - {departmentFound.description}
          </h1>
        </div>
      )}
      <div className="relative top-28 w-[82%] h-96 bg-[#3c5d93] overflow-y-auto p-6 border-gray-500 border grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
        {userInfo.department_uuid == null && (
          <h1 className="text-4xl font-bold absolute top-1/3 left-[28%]">
            Você ainda não foi contratado
          </h1>
        )}
        {departmentFound.users?.map((user) => {
          return (
            <div
              key={user.id}
              className="border-[#4200ff] bg-white h-32 py-1 px-4"
            >
              <h1 className="font-bold sm:text-2xl text-black">{user.name}</h1>
              <h1 className="text-black sm:text-2xl">
                {user.professional_level}
              </h1>
              <h1 className="text-black sm:text-2xl">{user.kind_of_work}</h1>
            </div>
          );
        })}
      </div>
    </main>
  );
}
