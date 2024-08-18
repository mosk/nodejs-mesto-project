import type { NextFunction, Request, Response } from 'express';
import type { IUser } from 'types';

import mongoose from 'mongoose';
import { ErrorNotFound, ErrorReqData } from '../errors';
import { MESSAGE } from '../consts';

import { User } from '../models';

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;

  if (!mongoose.isValidObjectId(userId)) next(new ErrorReqData(MESSAGE.BAD_USER_ID));

  try {
    const user = await User.findById(userId);

    if (!user) throw new ErrorNotFound(MESSAGE.NOT_FOUND_USER);

    res.send(user);
  } catch (err) {
    next(err);
  }
};

export const getUserCurrent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { _id: userId } = res.locals.user;

  if (!mongoose.isValidObjectId(userId)) next(new ErrorReqData(MESSAGE.BAD_USER_ID));

  try {
    const user = await User.findById(userId);

    if (!user) throw new ErrorNotFound(MESSAGE.NOT_FOUND_USER);

    res.send(user);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};

export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, about }: Omit<IUser, 'avatar'> = req.body;
  const { _id: userId } = res.locals.user;

  if (!mongoose.isValidObjectId(userId)) next(new ErrorReqData(MESSAGE.BAD_CARD_ID));

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        name,
        about,
      },
      {
        new: true,
      },
    );

    if (!user) throw new ErrorNotFound(MESSAGE.NOT_FOUND_USER);

    res.send(user);
  } catch (err) {
    if ((err as Error).name === 'ValidationError') {
      next(new ErrorReqData(MESSAGE.BAD_DATA));
    } else {
      next(err);
    }
  }
};

export const updateUserAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { avatar }: Pick<IUser, 'avatar'> = req.body;
  const { _id: userId } = res.locals.user;

  if (!mongoose.isValidObjectId(userId)) next(new ErrorReqData(MESSAGE.BAD_CARD_ID));

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        avatar,
      },
      {
        new: true,
      },
    );

    if (!user) throw new ErrorNotFound(MESSAGE.NOT_FOUND_USER);

    res.send(user);
  } catch (err) {
    if ((err as Error).name === 'ValidationError') {
      next(new ErrorReqData(MESSAGE.BAD_DATA));
    } else {
      next(err);
    }
  }
};
