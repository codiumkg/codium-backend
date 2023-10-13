import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './resources/user/user.service';
import { AuthService } from './resources/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './resources/auth/auth.controller';
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

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
    SubjectController,
    QuizController,
    ProfileController,
    QuizResultController,
  ],
  providers: [
    AppService,
    UserService,
    AuthService,
    PrismaService,
    JwtStrategy,
    SubjectService,
    QuizService,
    ProfileService,
    QuizResultService,
  ],
})
export class AppModule {}
