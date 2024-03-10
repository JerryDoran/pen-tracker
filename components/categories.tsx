'use client';

import { cn } from '@/lib/utils';
import qs from 'query-string';
import { Category } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';

type CategoriesProps = {
  data: Category[];
};

export default function Categories({ data }: CategoriesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get('categoryId');

  function onClick(id: string | undefined) {
    const query = { categoryId: id };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: query,
      },
      {
        skipNull: true,
      }
    );
    router.push(url);
  }
  return (
    <div className='w-full overflow-x-auto flex space-x-2 p-1'>
      <button
        onClick={() => onClick(undefined)}
        className={cn(
          'flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-75 transition',
          !categoryId ? 'bg-primary/25' : 'bg-primary/10'
        )}
      >
        Newest
      </button>
      {data.map((category) => (
        <button
          onClick={() => onClick(category.id)}
          key={category.id}
          className={cn(
            'flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-75 transition',
            categoryId === category.id ? 'bg-primary/25' : 'bg-primary/10'
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
