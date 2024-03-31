import { Assistant } from '@prisma/client';
import Image from 'next/image';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { MessagesSquare } from 'lucide-react';

type AssistantsProps = {
  data: (Assistant & {
    _count: {
      messages: number;
    };
  })[];
};

export default function Assistants({ data }: AssistantsProps) {
  if (data.length === 0) {
    return (
      <div className='pt-10 flex flex-col items-center justify-center space-y-3'>
        <div className='w-60 h-60 relative'>
          <Image src='/empty.png' alt='Empty' fill className='grayscale' />
        </div>
        <p className='text-sm text-muted-foreground'>No assistants found</p>
      </div>
    );
  }
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10'>
      {data.map((assistant) => (
        <Card
          key={assistant.id}
          className='bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0'
        >
          <Link href={`/chat/${assistant.id}`}>
            <CardHeader className='flex items-center justify-center text-center text-muted-foreground'>
              <div className='w-32 h-32 relative'>
                <Image
                  src={assistant.src}
                  alt={assistant.name}
                  fill
                  className='rounded-xl object-cover'
                />
              </div>
              <p className='font-bold '>{assistant.name}</p>
              <p className='text-sm'>{assistant.description}</p>
            </CardHeader>
            <CardFooter className='flex items-center justify-between text-xs text-muted-foreground'>
              <p className='lowercase'>@{assistant.userName}</p>
              <div className='flex items-center'>
                <MessagesSquare className='h-3 w-3 mr-1' />
                {assistant._count.messages}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
}
