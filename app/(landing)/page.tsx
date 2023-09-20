import MainPageSelect from '@/components/MainPageSelect';
import Image from 'next/image';

export default async function LandingPage() {
  return (
    <main className="h-full pt-3 bg-slate-500 md:flex md:gap-3">
      <div className="hidden md:block md:relative md:w-[50%] md:h-[550px] md:top-16 md:left-4">
        <Image
          src={'/Rectangle 7.svg'}
          fill
          alt="Business-people"
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      <MainPageSelect />
    </main>
  );
}
