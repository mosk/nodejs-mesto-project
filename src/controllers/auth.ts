import type { NextFunction, Request, Response } from 'express';
import type { IUser } from 'types';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ErrorAlreadyExist, ErrorReqData } from '../errors';
import { COOKIE_NAME, COOKIE_TIMEOUT, MESSAGE } from '../consts';

import getAppConfig from '../../config';
import { User } from '../models';

const { secretKey } = getAppConfig();

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password }: IUser = req.body;

  try {
    const { _id } = await User.findUserByCredentials({ email, password });
    const token = jwt.sign({ _id }, secretKey, { expiresIn: COOKIE_TIMEOUT });

    res
      .cookie(COOKIE_NAME, token, {
        expires: new Date(Date.now() + COOKIE_TIMEOUT),
        httpOnly: true,
        sameSite: true,
      })
      .send(MESSAGE.SUCCESS_AUTH);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user: IUser = req.body;

  try {
    const hash = await bcrypt.hash(user.password, 10);
    const {
      name, email, avatar, about,
    } = await User.create({
      ...user,
      password: hash,
    });

    res.status(201).send({
      name,
      email,
      avatar,
      about,
    });
  } catch (err) {
    if ((err as Error & { code: number }).code === 11000) {
      next(new ErrorAlreadyExist(MESSAGE.REG_EMAIL_ALREADY_EXIST));
    } else if ((err as Error).name === 'ValidationError') {
      next(new ErrorReqData(MESSAGE.BAD_DATA));
    } else {
      next(err);
    }
  }
};
