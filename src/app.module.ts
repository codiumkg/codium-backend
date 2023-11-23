import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { QuestionModule } from './resources/question/question.module';
import { AuthModule } from './resources/auth/auth.module';
import { AnswerModule } from './resources/answer/answer.module';
import { SectionModule } from './resources/section/section.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { QuizResultModule } from './resources/quiz-result/quiz-result.module';
import { QuizModule } from './resources/quiz/quiz.module';
import { ProfileModule } from './resources/profile/profile.module';
import { UserModule } from './resources/user/user.module';
import { SubjectModule } from './resources/subject/subject.module';
import { RegRequestModule } from './resources/reg-request/reg-request.module';
import { GroupModule } from './resources/group/group.module';
import { TopicModule } from './resources/topic/topic.module';
import { LectureModule } from './resources/lecture/lecture.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MulterModule.register({
      dest: '../public/uploads',
    }),
    QuestionModule,
    AuthModule,
    AnswerModule,
    SectionModule,
    QuizResultModule,
    QuizModule,
    ProfileModule,
    UserModule,
    SubjectModule,
    RegRequestModule,
    GroupModule,
    TopicModule,
    LectureModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtStrategy],
})
export class AppModule {}
