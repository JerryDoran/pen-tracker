'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { BeatLoader } from 'react-spinners';
import { Copy } from 'lucide-react';

import { useToast } from '@/components/ui/use-toast';
import BotAvatar from '@/components/bot-avatar';
import UserAvatar from '@/components/user-avatar';
import { Button } from '@/components/ui/button';

export type ChatMessageProps = {
  role: 'system' | 'user';
  content?: string;
  isLoading?: boolean;
  src?: string;
};

export default function ChatMessage({
  role,
  content,
  isLoading,
  src,
}: ChatMessageProps) {
  const { toast } = useToast();
  const { theme } = useTheme();

  function onCopy() {
    if (!content) {
      return;
    }

    navigator.clipboard.writeText(content);
    toast({
      title: 'Copied',
      description: 'Message copied to clipboard',
    });
  }

  return (
    <div
      className={cn(
        'group flex items-center gap-x-3 py-4 w-full',
        role === 'user' && 'justify-end'
      )}
    >
      {role !== 'user' && src && <BotAvatar src={src} />}
      <div className='rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10'>
        {isLoading ? (
          <BeatLoader color={theme === 'dark' ? 'white' : 'black'} size={5} />
        ) : (
          content
        )}
      </div>
      {role === 'user' && <UserAvatar />}
      {role !== 'user' && !isLoading && (
        <Button
          onClick={onCopy}
          className='opacity-0 group-hover:opacity-100 transition'
          size='icon'
          variant='ghost'
        >
          <Copy className='h-4 w-4' />
        </Button>
      )}
    </div>
  );
}
