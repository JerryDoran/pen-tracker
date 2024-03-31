'use client';

import { ChatRequestOptions } from 'ai';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';

type ChatFormProps = {
  isLoading: boolean;
  input: string;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
};

export default function ChatForm({
  isLoading,
  input,
  handleInputChange,
  onSubmit,
}: ChatFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className='border-t border-primary/10 py-4 flex items-center gap-x-2'
    >
      <Input
        placeholder='Type a message...'
        value={input}
        onChange={handleInputChange}
        disabled={isLoading}
        className='bg-primary/10 rounded-lg'
      />
      <Button disabled={isLoading} variant='ghost'>
        <SendHorizonal className='w-6 h-6' />
      </Button>
    </form>
  );
}
