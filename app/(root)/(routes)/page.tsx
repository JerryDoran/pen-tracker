import prismadb from '@/lib/prismadb';

import Categories from '@/components/categories';
import SearchInput from '@/components/search-input';
import Assistants from '@/components/assistants';

type RootPageProps = {
  searchParams: {
    categoryId?: string;
    name?: string;
  };
};

export default async function RootPage({ searchParams }: RootPageProps) {
  const data = await prismadb.assistant.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        contains: searchParams.name,
        mode: 'insensitive',
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  const categories = await prismadb.category.findMany();
  return (
    <div className='h-full p-4 space-y-2'>
      <SearchInput />
      <Categories data={categories} />
      <Assistants data={data} />
    </div>
  );
}
