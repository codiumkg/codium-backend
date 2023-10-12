import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './resources/user/user.service';
import { AuthService } from './resources/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { RoleService } from './resources/role/role.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService, AuthService, RoleService],
})
export class AppModule {}
