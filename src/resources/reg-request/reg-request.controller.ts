import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegRequestService } from './reg-request.service';
import { CreateRegRequestDto } from './dto/create-reg-request.dto';
import { UpdateRegRequestDto } from './dto/update-reg-request.dto';

@Controller('reg-request')
export class RegRequestController {
  constructor(private readonly regRequestService: RegRequestService) {}

  @Post()
  create(@Body() createRegRequestDto: CreateRegRequestDto) {
    return this.regRequestService.create(createRegRequestDto);
  }

  @Get()
  findAll() {
    return this.regRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regRequestService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegRequestDto: UpdateRegRequestDto,
  ) {
    return this.regRequestService.update(+id, updateRegRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regRequestService.remove(+id);
  }
}
