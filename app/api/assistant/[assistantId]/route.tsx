import prismadb from '@/lib/prismadb';
import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { assistantId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (!params.assistantId) {
      return new NextResponse('Assistant ID is required', { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse('Missing fields', { status: 400 });
    }

    // TODO: check for subscription

    const assistant = await prismadb.assistant.update({
      where: {
        id: params.assistantId,
        userId: user.id,
      },
      data: {
        src,
        name,
        description,
        instructions,
        seed,
        userId: user.id,
        categoryId,
        userName: user.firstName,
      },
    });

    return NextResponse.json(assistant);
  } catch (error) {
    console.log('[ASSISTANT_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { assistantId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const assistant = await prismadb.assistant.delete({
      where: {
        // no other user can delete this assistant except the creator
        userId,
        id: params.assistantId,
      },
    });

    return NextResponse.json(assistant);
  } catch (error) {
    console.log('[ASSISTANT_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
