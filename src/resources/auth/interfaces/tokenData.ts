import { Group, Role } from '@prisma/client';

export interface IUserData {
  username: string;
  role: Role;
  groupId?: number;
  group?: Group;
}
