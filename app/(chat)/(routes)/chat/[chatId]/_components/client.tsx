'use client';

import { Assistant, Message } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCompletion } from 'ai/react';

import ChatHeader from '@/components/chat-header';
import ChatForm from '@/components/chat-form';
import ChatMessages from '@/components/chat-messages';
import { ChatMessageProps } from '@/components/chat-message';

type ChatClientProps = {
  assistant: Assistant & { messages: Message[]; _count: { messages: number } };
};

export default function ChatClient({ assistant }: ChatClientProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(
    assistant.messages
  );

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${assistant.id}`,
      onFinish(prompt, completion) {
        // ai response
        const systemMessage: ChatMessageProps = {
          role: 'system',
          content: completion,
        };

        setMessages((currentMessages) => [...currentMessages, systemMessage]);
        setInput('');

        // updates all server components
        router.refresh();
      },
    });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const userMessage: ChatMessageProps = {
      role: 'user',
      content: input,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);

    handleSubmit(e);
  }

  return (
    <div className='flex flex-col h-full p-4 space-y-2'>
      <ChatHeader assistant={assistant} />
      <ChatMessages
        assistant={assistant}
        messages={messages}
        isLoading={isLoading}
      />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
