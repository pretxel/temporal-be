import { PrismaClient } from '@prisma/client';
import { singleton } from 'tsyringe';
@singleton()
export class Prisma {
  client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }
}
