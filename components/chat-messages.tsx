'use client';

import { Assistant } from '@prisma/client';
import { ElementRef, useEffect, useRef, useState } from 'react';

import ChatMessage, { ChatMessageProps } from '@/components/chat-message';

type ChatMessagesProps = {
  assistant: Assistant;
  messages: ChatMessageProps[];
  isLoading: boolean;
};

export default function ChatMessages({
  assistant,
  messages = [],
  isLoading,
}: ChatMessagesProps) {
  const scrollRef = useRef<ElementRef<'div'>>(null);
  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className='flex-1 overflow-y-auto pr-4'>
      <ChatMessage
        isLoading={fakeLoading}
        src={assistant.src}
        role='system'
        content={`Hello, I am ${assistant.name}, ${assistant.description}`}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          src={message.src}
          role={message.role}
          content={message.content}
        />
      ))}
      {isLoading && <ChatMessage role='system' src={assistant.src} isLoading />}
      <div ref={scrollRef} />
    </div>
  );
}
