import { Types } from 'mongoose';

export interface IUser {
  name: string,
  about: string,
  avatar: string,
}

export interface ICard {
  name: string,
  link: string,
  owner: Types.ObjectId,
  likes: Array<Types.ObjectId>,
  createdAt: Date,
}
