import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className="w-full h-full flex relative flex-col gap-14 items-center border-2 border-black bg-[#1c2c45]">
      <div className="w-[82%] flex relative top-9 justify-between">
        <Skeleton className="w-40 h-8" />
        <Skeleton className="w-32 h-8 bg-slate-100" />
        <Skeleton className="w-20 h-8 bg-[#4200ff]" />
      </div>
      <Skeleton className="w-[82%] h-[900px] shadow-blue-400 shadow-2xl rounded bg-[#3c5d93]" />
      <h1 className="text-3xl">Usuários Cadastrados</h1>
      <Skeleton className="w-[82%] h-96 shadow-blue-400 shadow-2xl rounded mb-9 bg-[#3c5d93]" />
    </main>
  );
}
