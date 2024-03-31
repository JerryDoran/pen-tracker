import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

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

    const assistant = await prismadb.assistant.create({
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
    console.log('[ASSISTANT_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
