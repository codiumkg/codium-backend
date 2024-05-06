import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TaskModule } from './resources/task/task.module';
import { AuthModule } from './resources/auth/auth.module';
import { AnswerModule } from './resources/answer/answer.module';
import { SectionModule } from './resources/section/section.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './resources/profile/profile.module';
import { UserModule } from './resources/user/user.module';
import { SubjectModule } from './resources/subject/subject.module';
import { RegRequestModule } from './resources/reg-request/reg-request.module';
import { GroupModule } from './resources/group/group.module';
import { TopicModule } from './resources/topic/topic.module';
import { LectureModule } from './resources/lecture/lecture.module';
import { ImageModule } from './resources/image/image.module';
import { TopicContentModule } from './resources/topic-content/topic-content.module';
import { LectureUserCompleteModule } from './resources/lecture-user-complete/lecture-user-complete.module';
import { TaskUserAnswerModule } from './resources/task-user-answer/task-user-answer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MulterModule.register({
      dest: '../public/uploads',
    }),

    AuthModule,
    AnswerModule,
    TaskModule,
    SectionModule,
    ProfileModule,
    UserModule,
    SubjectModule,
    RegRequestModule,
    GroupModule,
    TopicModule,
    LectureModule,
    ImageModule,
    TopicContentModule,
    LectureUserCompleteModule,
    TaskUserAnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtStrategy],
})
export class AppModule {}
