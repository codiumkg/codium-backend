import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role, User } from '@prisma/client';
import PaginationParams from 'src/interfaces/paginationParams';
import { GroupFilterParams } from './dto/group-filter-params';
import { GetUser } from 'src/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @UseGuards(RolesGuard)
  @Get()
  async findAll(
    @Query('username') username: string,
    @Query() { offset, limit }: PaginationParams,
    @Query('title') title: string,
    @Query() groupFilterParams: GroupFilterParams,
    @GetUser() user: User,
  ) {
    if (username) {
      const group = await this.groupService.findByUser(
        username,
        +offset,
        +limit,
      );

      if (!group) {
        throw new NotFoundException('Group for the given user not found');
      }

      return group;
    }

    if (user.role === Role.TEACHER) {
      return this.groupService.findAll({ teacherId: user.id });
    }

    return this.groupService.findAll({
      offset: +offset,
      limit: +limit,
      title,
      teacherId: groupFilterParams.teacherId,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Get(':id/get-students')
  async getStudents(@Param('id') id: string) {
    return this.groupService.getGroupStudents(+id);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
