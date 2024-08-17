import type { NextFunction, Request, Response } from "express";
import type { IUser } from "types";

import mongoose from "mongoose";
import { ERROR_MSG } from "../consts";
import { ErrorNotFound, ErrorResData } from "errors";

import { User } from "../models";

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;

  if (!mongoose.isValidObjectId(userId))
    next(new ErrorResData(ERROR_MSG.BAD_USER_ID));

  try {
    const user = await User.findById(userId);

    if (!user) throw new ErrorNotFound(ERROR_MSG.NOT_FOUND_USER);

    res.send(user);
  } catch (err) {
    next(err);
  }
};

// TODO: чекнуть
export const getUserCurrent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;

  if (!mongoose.isValidObjectId(userId))
    next(new ErrorResData(ERROR_MSG.BAD_USER_ID));

  try {
    const user = await User.findById(userId);

    if (!user) throw new ErrorNotFound(ERROR_MSG.NOT_FOUND_USER);

    res.send(user);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
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
  next: NextFunction
) => {
  const {
    id: userId,
    name,
    about,
  }: Omit<IUser, "avatar"> & { id: string } = req.body;

  if (!mongoose.isValidObjectId(userId))
    next(new ErrorResData(ERROR_MSG.BAD_CARD_ID));

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        name,
        about,
      },
      {
        new: true,
      }
    );

    if (!user) throw new ErrorNotFound(ERROR_MSG.NOT_FOUND_USER);

    res.send(user);
  } catch (err) {
    next(err);
  }
};

export const updateUserAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: userId, avatar }: Pick<IUser, "avatar"> & { id: string } =
    req.body;

  if (!mongoose.isValidObjectId(userId))
    next(new ErrorResData(ERROR_MSG.BAD_CARD_ID));

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        avatar,
      },
      {
        new: true,
      }
    );

    if (!user) throw new ErrorNotFound(ERROR_MSG.NOT_FOUND_USER);

    res.send(user);
  } catch (err) {
    next(err);
  }
};
