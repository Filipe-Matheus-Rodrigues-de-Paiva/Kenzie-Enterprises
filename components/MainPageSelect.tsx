'use client';

import { ChangeEvent, useState } from 'react';

export interface ISector {
  uuid: string;
  description: string;
}

export interface ICompany {
  uuid: string;
  name: string;
  opening_hours: string;
  description: string;
  sectors: ISector;
}

export default function MainPageSelect() {
  const sectors = [
    {
      uuid: 'c15f3de1-8dab-4b1d-9f85-7e09d208b0a1',
      description: 'Alimenticio',
    },
    {
      uuid: 'fb0292b6-9f27-45c7-93f5-8f1e8e5bf532',
      description: 'Varejo',
    },
    {
      uuid: '4fcfc9cc-7ebc-4890-87f2-2e63d1c49e1e',
      description: 'Textil',
    },
    {
      uuid: '1d4c6366-344a-4bfe-aa4e-5371d5c4a0cf',
      description: 'Manufatura',
    },
    {
      uuid: 'e7d3e385-3e23-42c3-917e-83ed1618dd41',
      description: 'Aeroespacial',
    },
    {
      uuid: 'a5f0b9e9-56c8-4e09-9f29-01a48c6d7c49',
      description: 'Automotiva',
    },
    {
      uuid: 'bd548a5a-3829-4b89-a509-9f4e9d0c5a45',
      description: 'TI',
    },
    {
      uuid: 'f95f73b5-0a1d-4f13-b3c2-17ef992b8d73',
      description: 'Atacado',
    },
  ];

  const companies = [
    {
      uuid: '9b53d868-42ac-4f05-92e6-4ad7c1166c39',
      name: 'Skina Lanches',
      opening_hours: '09:00',
      description: 'Podrão de qualidade',
      sectors: {
        uuid: '042cd7ac-c6fa-464b-88b3-51a2c3fb2e7c',
        description: 'Alimenticio',
      },
    },
    {
      uuid: '5e46b8d2-92fb-42bd-8270-11dc4dd7d52c',
      name: 'Gela Guela',
      opening_hours: '09:00',
      description: 'Sorvetes barateza',
      sectors: {
        uuid: '042cd7ac-c6fa-464b-88b3-51a2c3fb2e7c',
        description: 'Alimenticio',
      },
    },
    {
      uuid: 'a0d7ef5d-9eaf-46fd-8f0b-4d0b309f9d9e',
      name: 'Mercado Kenzie',
      opening_hours: '09:00',
      description: 'Padrão de qualidade',
      sectors: {
        uuid: 'f0fe33d7-b78b-47de-859f-f74ee08ced52',
        description: 'Varejo',
      },
    },
    {
      uuid: '6a202eb2-4192-403c-84a1-ec5c8c9a8b3e',
      name: 'Gortifruti da Terra',
      opening_hours: '09:00',
      description: 'Natural e sem agrotóxicos',
      sectors: {
        uuid: 'f0fe33d7-b78b-47de-859f-f74ee08ced52',
        description: 'Varejo',
      },
    },
    {
      uuid: 'c246cfc7-5eea-4341-8331-56b23eed01ea',
      name: 'Tecidos Dona Florinda',
      opening_hours: '09:00',
      description: 'Nossos tecidos são nossos tesouros',
      sectors: {
        uuid: '2fb07a07-c9f5-4427-b4e0-2330add177a9',
        description: 'Textil',
      },
    },
    {
      uuid: '861178ff-7d56-46b1-bdd7-ef1cbebaa672',
      name: 'Malhas Alberto',
      opening_hours: '09:00',
      description:
        'Compre suas roupas de academia aqui! melhor preço da região',
      sectors: {
        uuid: '2fb07a07-c9f5-4427-b4e0-2330add177a9',
        description: 'Textil',
      },
    },
    {
      uuid: 'cd7eac7c-fdf1-4ba3-9d24-5e7c49d0cde9',
      name: 'DevModa',
      opening_hours: '09:00',
      description: 'Roupas para um estilo de uma pessoa desenvolvedora',
      sectors: {
        uuid: '9b41ddcf-a4bd-4f48-a6c5-32f2abb3b3dc',
        description: 'Manufatura',
      },
    },
    {
      uuid: '406ed701-5068-4502-9184-4e06f3c13f6d',
      name: 'Edna Moda',
      opening_hours: '09:00',
      description: 'Roupas de grifes, mas sem capas',
      sectors: {
        uuid: '9b41ddcf-a4bd-4f48-a6c5-32f2abb3b3dc',
        description: 'Manufatura',
      },
    },
    {
      uuid: 'a134a4da-95e0-478a-b0ac-eacd942f3ad7',
      name: 'KenzieX',
      opening_hours: '09:00',
      description: 'Levando nossos desenvolvedores a outro mundo',
      sectors: {
        uuid: '62de3b6f-bba4-4bc5-af6e-fb30b4356bf3',
        description: 'Aeroespacial',
      },
    },
    {
      uuid: 'd578cfa3-4294-42a9-a837-56806bc184e7',
      name: 'Evolution Tech',
      opening_hours: '09:00',
      description:
        'Focamos nossos estudos e desenvolvimento em foguetes melhores e mais rapidos!!',
      sectors: {
        uuid: '62de3b6f-bba4-4bc5-af6e-fb30b4356bf3',
        description: 'Aeroespacial',
      },
    },
    {
      uuid: '19f82d75-75c7-4f02-ad67-52b36fdabab7',
      name: 'Boacharria',
      opening_hours: '09:00',
      description: 'Se furar o pneu, conta comigo',
      sectors: {
        uuid: '980fc603-8915-41e0-9240-0c8c3b024c3d',
        description: 'Automotiva',
      },
    },
    {
      uuid: 'a530c0c2-418b-42b8-b6e2-066554a2892c',
      name: 'Offcina',
      opening_hours: '09:00',
      description: 'Arrumamos seu carro',
      sectors: {
        uuid: '980fc603-8915-41e0-9240-0c8c3b024c3d',
        description: 'Automotiva',
      },
    },
    {
      uuid: 'b11aae6d-3f9d-4b9b-a119-6a62e9a494f8',
      name: 'Nerd lab',
      opening_hours: '09:00',
      description: 'Criamos um site rapidão pra você',
      sectors: {
        uuid: '3854e74a-0a96-43dd-b44b-f884c08ff3a1',
        description: 'TI',
      },
    },
    {
      uuid: '9cbc0470-f4e8-4579-ae9b-48ebce49073e',
      name: 'Chipset manutenções',
      opening_hours: '09:00',
      description: 'Arrumamos o PC',
      sectors: {
        uuid: '3854e74a-0a96-43dd-b44b-f884c08ff3a1',
        description: 'TI',
      },
    },
    {
      uuid: '785d7f64-8ceb-4cab-a15e-10b6d42dbfca',
      name: 'Mercado Popular',
      opening_hours: '09:00',
      description: 'Melhor preço e qualidade!!',
      sectors: {
        uuid: 'f38dad57-0f16-4bd5-86e5-c3a7706df623',
        description: 'Atacado',
      },
    },
    {
      uuid: 'dd99a2a5-9032-4dae-8da7-b3bf8c2c8d05',
      name: 'Atacadão Kenzie',
      opening_hours: '09:00',
      description: 'Liquidamos todas as ofertas!!',
      sectors: {
        uuid: 'f38dad57-0f16-4bd5-86e5-c3a7706df623',
        description: 'Atacado',
      },
    },
  ];

  const [filter, setFilter] = useState('');

  const mapTarget =
    filter === ''
      ? companies
      : companies.filter(
          (company: ICompany) => company.sectors.description === filter
        );

  return (
    <div className="relative top-20 px-2 flex flex-col md:w-[45%] md:block md:absolute md:right-[2%]">
      <select
        className="bg-blue-800 text-white h-11 border-none w-full m-auto rounded-none text-center"
        value={filter}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setFilter(e.target.value)
        }
      >
        <option value="">Selecione um setor</option>
        {sectors.map((sector: ISector) => {
          return (
            <option key={sector.uuid} value={sector.description}>
              {sector.description}
            </option>
          );
        })}
      </select>
      <div className="h-72 md:h-[500px] bg-slate-300 flex items-center justify-center">
        <ul
          id="company-list"
          className="h-4/5 md:h-full pt-2 w-full overflow-y-auto flex gap-3 pl-3 md:flex-col"
        >
          {mapTarget.map((company: ICompany) => {
            return (
              <li
                className="bg-slate-50 border-b-[#4200FF] border p-3 min-w-[200px] z-10 flex flex-col justify-between md:w-[97%]"
                key={company.uuid}
              >
                <h3 className="font-bold">{company.name}</h3>
                <div>
                  <h4>{company.opening_hours.split(':')[0]} horas</h4>
                  <span className="bg-slate-50 border border-blue-500 rounded-xl p-1 mt-2">
                    {company.sectors.description}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
