import { auth, redirectToSignIn } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';
import AssistantForm from './_components/assistant-form';

type AssistantIdProps = {
  params: {
    assistantId: string;
  };
};

export default async function AssistantIdPage({ params }: AssistantIdProps) {
  // TODO: check subscription

  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const assistant = await prismadb.assistant.findUnique({
    where: {
      id: params.assistantId,
      userId,
    },
  });

  const categories = await prismadb.category.findMany();

  return <AssistantForm initialData={assistant} categories={categories} />;
}
