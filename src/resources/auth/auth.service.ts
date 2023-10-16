import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto, SignupDto } from 'src/resources/auth/dto/auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

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
    try {
      const user = await this.userService.getUserByUsername(username);

      let token: string;

      if (!user) throw new NotFoundException('User not found');

      await bcrypt.compare(password, user.password).then(async (result) => {
        if (result) {
          token = await this.jwtService.signAsync({
            id: user.id,
            username,
            role: user.role,
            subject: user.subject,
          });
        } else {
          throw new ForbiddenException('Password or user did not match');
        }
      });

      return {
        message: 'Authorization successful!',
        token: token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          subject: user.subject,
        },
      };
    } catch (e) {
      return new BadRequestException(e.message);
    }
  }

  async signup(user: SignupDto) {
    try {
      const hash = await bcrypt.hash(user.password, 12);

      if (!hash)
        throw new BadRequestException('An error occured while creating a user');

      const newUser = await this.userService.createUser({
        ...user,
        role: user.role || Role.STUDENT,
        password: hash,
      });

      return {
        message: 'User created successfully!',
        user: {
          username: newUser.username,
        },
      };
    } catch (e) {
      return new BadRequestException(e.message);
    }
  }
}
