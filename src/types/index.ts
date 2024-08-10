import type { Request } from 'express';
import { Types } from 'mongoose';

export type TRequestWithId = Request & Record<'user', Record<'_id', string>>

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

export interface ICustomError {
  code: number,
  message: string
}
