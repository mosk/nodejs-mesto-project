import type { Request } from 'express';
import type { Types } from 'mongoose';

export { IUser, IUserModel } from './user';

export type TRequestWithId = Request & Record<'user', Record<'_id', string>>

export interface ICard {
  name: string,
  link: string,
  owner: Types.ObjectId,
  likes: Array<Types.ObjectId>,
  createdAt: Date,
}

export interface ICustomError {
  code: number,
  message: string
}
