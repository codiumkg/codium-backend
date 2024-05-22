import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { TopicModule } from '../topic/topic.module';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TopicModule],
  controllers: [SectionController],
  providers: [SectionService, PrismaService, JwtService],
  exports: [SectionService],
})
export class SectionModule {}
