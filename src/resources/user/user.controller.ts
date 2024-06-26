import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/resources/user/dto/user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role, User } from '@prisma/client';
import { GetUser } from 'src/decorators/user.decorator';
import { TaskUserAnswerService } from '../task-user-answer/task-user-answer.service';
import { UserFiltersDto } from './dto/user-filters.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly taskUserAnswerService: TaskUserAnswerService,
  ) {}

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getUsers(@Query() filtersDto: UserFiltersDto) {
    return this.userService.getUsers(filtersDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-my-progress')
  async getMyProgress(@GetUser() user: User) {
    return this.userService.getProgress(user);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/get-progress')
  async getUserProgress(@Param('id') id: string) {
    const user = await this.userService.getUserById(+id);

    return this.userService.getProgress(user);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/get-task-answers')
  async getTaskAnswers(@Param('id') id: string) {
    return this.taskUserAnswerService.findByUser(+id);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':id/reset-password')
  async resetPassword(@Param('id') id: string) {
    return this.userService.changePassword(+id, 'codium123');
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
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
