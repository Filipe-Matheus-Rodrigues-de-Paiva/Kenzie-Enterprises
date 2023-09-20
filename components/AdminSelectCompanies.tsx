'use client';

import {
  ICompany,
  IDepartment,
  IUser,
  IUserOutOfWork,
} from '@/app/(dashboard)/admin/page';
import { ChangeEvent, useState } from 'react';
import CreateDepartmentModal from './CreateDepartmentModal';
import EditDepartment from './EditDepartment';
import AlertDepartment from './AlertDepartment';
import ReviewDepartmentModal from './ReviewDepartmentModal';

interface IProps {
  companies: ICompany[];
  token: string | undefined;
  departments: IDepartment[];
  users: IUser[];
  usersOutOfWork: IUserOutOfWork[];
}

export default function AdminSelectCompanies({
  companies,
  token,
  departments,
  users,
  usersOutOfWork,
}: IProps) {
  const [filter, setFilter] = useState('');

  const mapTarget =
    filter === ''
      ? departments
      : departments.filter((department) => department.company.id === filter);

  const companyFound =
    filter === '' ? null : companies.find((company) => company.id === filter);

  return (
    <div className="w-[82%] h-[400px] relative top-5">
      <div className="sm:flex justify-between items-center relative">
        <h1 className="font-bold md:text-3xl">Departamentos</h1>
        <select
          className="w-28 h-8 sm:absolute sm:left-[45%] sm:w-[160px]"
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFilter(e.target.value)
          }
        >
          <option value="">Todas os departamentos</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        <CreateDepartmentModal token={token} companies={companies} />
      </div>
      <div className="bg-[#3c5d93] rounded shadow-blue-400 shadow-2xl mt-4 h-[342px] overflow-y-auto grid sm:grid-cols-2 lg:grid-cols-3 p-7 gap-x-8 gap-y-6">
        {mapTarget.length > 0 ? (
          mapTarget.map((department) => {
            return (
              <div
                className="h-[196px] relative bg-slate-100 border-[#4200ff] border-2 pl-4 pt-4"
                key={department.id}
              >
                <p className="font-bold text-xl mb-2">{department.name}</p>
                <p className="text-xl mb-2">{department.description}</p>
                <p className="text-xl">{department.company.name}</p>
                <ReviewDepartmentModal
                  department={department}
                  users={users}
                  token={token}
                  usersOutOfWork={usersOutOfWork}
                />
                <EditDepartment token={token} department={department} />
                <AlertDepartment token={token} department={department} />
              </div>
            );
          })
        ) : filter === '' ? (
          <h1 className="text-3xl relative left-[100%] top-24 h-fit w-[700px]">
            Nenhum departamento criado ainda
          </h1>
        ) : (
          <h1 className="md:text-2xl text-center relative top-24 lg:left-full h-fit">
            Empresa {companyFound?.name} não possui departamentos
          </h1>
        )}
      </div>
    </div>
  );
}
