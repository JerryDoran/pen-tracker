import { auth, redirectToSignIn } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';
import ChatClient from './_components/client';

type ChatIdPageProps = {
  params: {
    chatId: string;
  };
};

export default async function ChatIDPage({ params }: ChatIdPageProps) {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const assistant = await prismadb.assistant.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: 'asc',
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!assistant) {
    return redirect('/');
  }

  return <ChatClient assistant={assistant} />;
}
