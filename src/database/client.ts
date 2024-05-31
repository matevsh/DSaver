import { PrismaClient, Prisma } from "@prisma/client";

export const client: PrismaClient = new PrismaClient();

export type Client = PrismaClient | Prisma.TransactionClient;
