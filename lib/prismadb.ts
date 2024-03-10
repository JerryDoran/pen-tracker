import { PrismaClient } from '@prisma/client';

// adds prisma to the window object
declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prismadb;
}

export default prismadb;
