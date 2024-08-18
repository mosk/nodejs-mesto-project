import type { Types } from 'mongoose';

export interface ICard {
  name: string;
  link: string;
  owner: Types.ObjectId;
  likes: Array<Types.ObjectId>;
  createdAt: Date;
}
