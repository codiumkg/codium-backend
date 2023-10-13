import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { SignupDto } from 'src/dtos/auth/auth.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async getUserByUsername(username: string) {
    return this.prismaService.user.findUnique({
      where: { username },
      include: { subject: true },
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prismaService.user.findFirst({ where: { id } });
  }

  async createUser(user: SignupDto) {
    const newUser = await this.prismaService.user.create({
      data: {
        username: user.username,
        password: user.password,
        email: user.email,
        subjectId: user.subjectId,
        role: user.role,
      },
    });

    await this.prismaService.profile.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        image: user.image,
        userId: newUser.id,
      },
    });

    return newUser;
  }

  async deleteUser(id: number): Promise<User> {
    return this.prismaService.user.delete({ where: { id } });
  }
}
