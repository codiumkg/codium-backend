import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: async () => ({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: '30d',
    },
  }),
};
