'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function SearchInput() {
  return (
    <div className='relative'>
      <Search className='h-4 w-4 absolute left-4 top-3 text-muted-foreground' />
      <Input placeholder='Search...' className='pl-10 bg-primary/10' />
    </div>
  );
}
