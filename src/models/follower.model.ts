import { Prisma } from "@prisma/client";

export interface Follower {
  user_id_follow: string;
  user_id_followed: string;
}

export type CreateFollowerDto = Prisma.FollowerCreateInput;
export type UptadeFollowerDto = Prisma.FollowerUpdateInput;