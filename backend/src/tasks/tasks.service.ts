import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: any) {
    return this.prisma.task.create({ data: { ...data, userId } });
  }

  async findAll(userId: number) {
    return this.prisma.task.findMany({ where: { userId } });
  }

  async update(id: number, userId: number, data: any) {
    return this.prisma.task.update({ where: { id }, data });
  }

  async remove(id: number, userId: number) {
    return this.prisma.task.delete({ where: { id } });
  }
}
