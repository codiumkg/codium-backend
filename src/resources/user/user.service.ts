import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { SignupDto } from 'src/resources/auth/dto/auth.dto';
import { CreateUserDto } from 'src/resources/user/dto/user.dto';
import { paginationOptions } from 'src/constants/transactionOptions';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async getUsers(offset?: number, limit?: number) {
    try {
      const users = await this.prismaService.user.findMany({
        ...paginationOptions(offset, limit),
        include: { profile: true },
      });

      return users.map((user) => {
        delete user.password;

        return user;
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getUserByUsername(username: string) {
    return this.prismaService.user.findUnique({
      where: { username },
      include: { group: { include: { subject: true } }, profile: true },
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prismaService.user.findFirst({
      where: { id },
      include: { profile: true },
    });
  }

  async createUser(user: SignupDto) {
    const newUser = await this.prismaService.user.create({
      data: {
        username: user.username,
        password: user.password,
        email: user.email,
        groupId: user.groupId,
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
        age: user.age,
      },
    });

    return newUser;
  }

  async updateUser(id: number, user: Partial<CreateUserDto>) {
    const updatedUser = await this.prismaService.user.update({
      where: { id: +id },
      data: {
        username: user.username,
        password: user.password,
        email: user.email,
        phone: user.phone,
        role: user.role,
        groupId: user.groupId,
      },
    });

    await this.prismaService.profile.update({
      where: {
        userId: +updatedUser.id,
      },
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        image: user.image,
        age: user.age,
      },
    });

    return updatedUser;
  }

  async deleteUser(id: number): Promise<User> {
    return this.prismaService.user.delete({ where: { id } });
  }
}
