import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/resources/user/dto/user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role } from '@prisma/client';
import PaginationParams from 'src/interfaces/paginationParams';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getUsers(@Query() { offset, limit }: PaginationParams) {
    return this.userService.getUsers(+offset, +limit);
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
