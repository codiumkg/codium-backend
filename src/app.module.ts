import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { QuestionModule } from './resources/question/question.module';
import { AuthModule } from './resources/auth/auth.module';
import { AnswerModule } from './resources/answer/answer.module';
import { ContentModule } from './resources/content/content.module';
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
    ContentModule,
    SectionModule,
    QuizResultModule,
    QuizModule,
    ProfileModule,
    UserModule,
    SubjectModule,
    RegRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtStrategy],
})
export class AppModule {}
