import { Group, Profile, Role } from '@prisma/client';

export interface IUserData {
  id: number;
  username: string;
  role: Role;
  groupId?: number;
  group?: Group;
  profile?: Profile;
}
