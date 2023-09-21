import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className="w-full h-full relative pt-9 flex flex-col gap-14 items-center border-2 border-black bg-[#1c2c45]">
      <Skeleton className="w-[82%] h-40  border-gray-500 border shadow-blue-400 shadow-2xl rounded bg-[#3c5d93]" />
      <Skeleton className="w-[82%] h-96 shadow-blue-400 shadow-2xl rounded mb-9 bg-[#3c5d93]" />
    </main>
  );
}
