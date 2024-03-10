'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import qs from 'query-string';

import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get('categoryId');
  const name = searchParams.get('name');

  const [value, setValue] = useState(name || '');

  // use a debounce function to prevent unnecessary database calls
  const debouncedValue = useDebounce<string>(value, 500);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  useEffect(() => {
    const query = {
      categoryId,
      name: debouncedValue,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: query,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );

    router.push(url);
  }, [debouncedValue, categoryId, router]);

  return (
    <div className='relative'>
      <Search className='h-4 w-4 absolute left-4 top-3 text-muted-foreground' />
      <Input
        onChange={onChange}
        value={value}
        placeholder='Search...'
        className='pl-10 bg-primary/10'
      />
    </div>
  );
}
