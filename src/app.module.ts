import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './resources/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserController } from './resources/user/user.controller';
import { SubjectService } from './resources/subject/subject.service';
import { SubjectController } from './resources/subject/subject.controller';
import { QuizController } from './resources/quiz/quiz.controller';
import { QuizService } from './resources/quiz/quiz.service';
import { ProfileController } from './resources/profile/profile.controller';
import { ProfileService } from './resources/profile/profile.service';
import { QuizResultService } from './resources/quiz-result/quiz-result.service';
import { QuizResultController } from './resources/quiz-result/quiz-result.controller';
import { QuestionModule } from './resources/question/question.module';
import { AuthModule } from './resources/auth/auth.module';
import { AnswerModule } from './resources/answer/answer.module';
import { ContentModule } from './resources/content/content.module';
import { SectionModule } from './resources/section/section.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MulterModule.register({
      dest: '../public/uploads',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '30d',
      },
    }),
    QuestionModule,
    AuthModule,
    AnswerModule,
    ContentModule,
    SectionModule,
  ],
  controllers: [
    AppController,
    UserController,
    SubjectController,
    QuizController,
    ProfileController,
    QuizResultController,
  ],
  providers: [
    AppService,
    UserService,
    PrismaService,
    JwtStrategy,
    SubjectService,
    QuizService,
    ProfileService,
    QuizResultService,
  ],
})
export class AppModule {}
