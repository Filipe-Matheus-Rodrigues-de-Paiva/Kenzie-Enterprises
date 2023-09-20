import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className="h-full pt-3 bg-slate-500 md:flex md:gap-3">
      <Skeleton className="hidden md:block md:relative md:w-[50%] md:h-[550px] md:top-16 md:left-4" />
    </main>
  );
}
