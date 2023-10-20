import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/resources/user/dto/user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateUser(
    @Body() user: Partial<CreateUserDto>,
    @Param('id') id: number,
  ) {
    return this.userService.updateUser(id, user);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.userService.deleteUser(id);

    return HttpStatus.OK;
  }
}
