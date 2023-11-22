import { Role } from '@prisma/client';

export interface ITokenData {
  username: string;
  role: Role;
}
