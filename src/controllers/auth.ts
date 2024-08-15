import type { Request, Response } from 'express';
import type { IUser } from 'types';

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { COOKIE_NAME, COOKIE_TIMEOUT } from '../consts';
import { sendError } from '../helpers';
import ERRORS from '../consts/errors';

import getAppConfig from '../../config';
import { User } from '../models';

const { secretKey } = getAppConfig();

export const login = async (req: Request, res: Response) => {
  const { email, password }: IUser = req.body;

  try {
    const { _id } = await User.findUserByCredentials({ email, password });
    const token = jwt.sign(
      { _id },
      secretKey,
      { expiresIn: COOKIE_TIMEOUT },
    );

    return res
      .cookie(COOKIE_NAME, token, {
        expires: new Date(Date.now() + COOKIE_TIMEOUT),
        httpOnly: true,
      })
      .end();
  } catch (err) {
    return sendError(res, {
      ...ERRORS.DEFAULT,
      message: `${ERRORS.DEFAULT.message}: ${(err as Error).message}`,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const user: IUser = req.body;

  try {
    const hash = await bcrypt.hash(user.password, 10);
    const {
      name, email, avatar, about,
    } = await User.create({
      ...user,
      password: hash,
    });

    return res.status(201).send({
      name, email, avatar, about,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return sendError(res, {
        ...ERRORS.INCORRECT_DATA,
        message: `${ERRORS.INCORRECT_DATA.message}. ${err.message}`,
      });
    }

    return sendError(res, {
      ...ERRORS.DEFAULT,
      message: `${ERRORS.DEFAULT.message}. ${(err as Error).message}`,
    });
  }
};
