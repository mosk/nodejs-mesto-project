import type { Model, Document } from 'mongoose';

export interface IUser {
  email: string,
  password: string
  name?: string,
  about?: string,
  avatar?: string,
}

export interface IUserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCredentials({ email, password }: IUser): Promise<Document<unknown, any, IUser>>;
}
