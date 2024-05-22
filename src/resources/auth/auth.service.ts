import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ChangePasswordDto, LoginDto } from 'src/resources/auth/dto/auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUserData } from './interfaces/tokenData';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  async login({ username, password }: LoginDto) {
    const user = await this.userService.getUserByUsername(username);

    let token: string;

    if (!user) throw new UnauthorizedException('User not found');

    await bcrypt.compare(password, user.password).then(async (result) => {
      if (result) {
        token = await this.jwtService.signAsync({
          id: user.id,
          username,
          role: user.role,
          group: user.group,
          profile: user.profile,
        });
      } else {
        throw new UnauthorizedException('Password or user did not match');
      }
    });

    return {
      message: 'Authorization successful!',
      token: token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        group: user.group,
      },
    };
  }

  async changePassword(
    { currentPassword, newPassword }: ChangePasswordDto,
    user: User,
  ) {
    const currentUser = await this.userService.getUserById(user.id);

    const isMatch = await bcrypt.compare(currentPassword, currentUser.password);

    if (!isMatch) throw new UnauthorizedException('Пароли не совпадают');

    await this.userService.changePassword(user.id, newPassword);

    return {
      message: 'Пароль успешно изменен',
    };
  }

  async status(token: string) {
    try {
      const data: IUserData = this.jwtService.decode(token) as IUserData;
      return {
        id: data.id,
        username: data.username,
        role: data.role,
        group: data.group,
      };
    } catch (e) {
      throw new BadRequestException('Failed to check status');
    }
  }
}
