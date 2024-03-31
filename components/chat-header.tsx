'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';

import { Assistant, Message } from '@prisma/client';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  Edit,
  MessagesSquare,
  MoreVertical,
  Trash,
} from 'lucide-react';
import BotAvatar from '@/components/bot-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';

type ChatHeaderProps = {
  assistant: Assistant & { messages: Message[]; _count: { messages: number } };
};

export default function ChatHeader({ assistant }: ChatHeaderProps) {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  async function onDelete() {
    try {
      await axios.delete(`/api/assistant/${assistant.id}`);
      toast({
        description: 'Assistant deleted successfully.',
      });
      // refresh server component with the latest data
      router.refresh();
      router.push('/');
    } catch (error) {
      toast({
        description: 'Something went wrong.',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className='flex w-full justify-between items-center border-b border-primary/10 pb-4'>
      <div className='flex gap-x-2 items-center'>
        <Button onClick={() => router.back()} size='icon' variant='ghost'>
          <ChevronLeft className='h-8 w-8' />
        </Button>
        <BotAvatar src={assistant.src} />
        <div className='flex flex-col gap-y-1'>
          <div className='flex items-center gap-x-2'>
            <p className='font-bold'>{assistant.name}</p>
            <div className='flex items-center text-xs text-muted-foreground'>
              <MessagesSquare className='h-4 w-4 mr-1' />
              {assistant._count.messages}
            </div>
          </div>
          <p className='text-xs text-muted-foreground'>
            Created by {assistant.userName}
          </p>
        </div>
      </div>
      {/* are you the creator of this assistant */}
      {user?.id === assistant.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant='secondary' size='icon'>
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              onClick={() => router.push(`/assistant/${assistant.id}`)}
            >
              <Edit className='mr-2 h-4 w-4' />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash className='mr-2 h-4 w-4' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
