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

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '30d',
      },
    }),
    QuestionModule,
    AuthModule,
    AnswerModule,
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
