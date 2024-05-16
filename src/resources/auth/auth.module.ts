import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { UserModule } from '../user/user.module';
import { TopicService } from '../topic/topic.service';
import { TopicContentService } from '../topic-content/topic-content.service';
import { GroupService } from '../group/group.service';
import { SectionService } from '../section/section.service';
import { LectureUserCompleteService } from '../lecture-user-complete/lecture-user-complete.service';
import { TaskUserAnswerService } from '../task-user-answer/task-user-answer.service';

@Module({
  imports: [JwtModule.registerAsync(jwtConfig), UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    TopicService,
    TopicContentService,
    GroupService,
    SectionService,
    LectureUserCompleteService,
    TaskUserAnswerService,
    PrismaService,
  ],
})
export class AuthModule {}
