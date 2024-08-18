import type { IUser, IUserModel } from 'types';
import { Schema, model } from 'mongoose';
import { isEmail, isURL } from 'validator';
import bcrypt from 'bcryptjs';
import { ErrorAuth } from '../errors';
import { ERROR_MSG } from '../consts';

const User = new Schema<IUser, IUserModel>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v: string) => isURL(v),
      message: 'Некорректная ссылка для аватара',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => isEmail(v),
      message: 'Email не соответствует схеме электронной почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

User.static(
  'findUserByCredentials',
  async function findUserByCredentials({ email, password }: IUser) {
    const user = await this.findOne({ email }).select('+password');

    if (!user) return Promise.reject(new ErrorAuth(ERROR_MSG.AUTH_WRONG_CREDS));

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) return Promise.reject(new ErrorAuth(ERROR_MSG.AUTH_WRONG_CREDS));

    return user;
  },
);

export default model<IUser, IUserModel>('user', User);
