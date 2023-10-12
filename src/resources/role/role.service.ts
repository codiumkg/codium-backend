import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async getRoleById(id: number): Promise<Role | null> {
    return this.prismaService.role.findFirst({ where: { id } });
  }

  async getRoles(): Promise<Role[]> {
    return this.prismaService.role.findMany();
  }

  async createRole(title: string): Promise<Role> {
    return this.prismaService.role.create({ data: { title } });
  }

  async deleteRole(id: number) {
    return this.prismaService.role.delete({ where: { id } });
  }
}
