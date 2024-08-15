import type { Request, Response } from 'express';
import type { TRequestWithId, IUser } from 'types';

import mongoose from 'mongoose';
import { sendError } from '../helpers';
import ERRORS from '../consts/errors';

import { User } from '../models';

export const getUser = (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!mongoose.isValidObjectId(userId)) {
    sendError(res, ERRORS.INCORRECT_USER_ID);
    return;
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        sendError(res, ERRORS.NOT_FOUND_USER);
        return;
      }

      res.send(user);
    })
    .catch((err) => sendError(res, {
      ...ERRORS.DEFAULT,
      message: `${ERRORS.DEFAULT}: ${err.message}`,
    }));
};

export const getUserProfile = (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!mongoose.isValidObjectId(userId)) {
    sendError(res, ERRORS.INCORRECT_USER_ID);
    return;
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        sendError(res, ERRORS.NOT_FOUND_USER);
        return;
      }

      res.send(user);
    })
    .catch((err) => sendError(res, {
      ...ERRORS.DEFAULT,
      message: `${ERRORS.DEFAULT}: ${err.message}`,
    }));
};

export const getAllUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => sendError(res, {
      ...ERRORS.DEFAULT,
      message: `${ERRORS.DEFAULT}: ${err.message}`,
    }));
};

export const updateUserProfile = (req: Request, res: Response) => {
  const { id, name, about }: Omit<IUser, 'avatar'> & {id: string} = req.body;

  if (!mongoose.isValidObjectId(id)) {
    sendError(res, ERRORS.INCORRECT_USER_ID);
    return;
  }

  if (name?.length || about?.length) {
    sendError(res, ERRORS.INCORRECT_DATA);
    return;
  }

  User.findByIdAndUpdate(
    id,
    {
      name, about,
    },
    {
      new: true,
    },
  )
    .then((user) => {
      if (!user) {
        sendError(res, ERRORS.NOT_FOUND_USER);
        return;
      }

      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        sendError(res, {
          ...ERRORS.INCORRECT_DATA,
          message: `${ERRORS.INCORRECT_DATA}: ${err.message}`,
        });
      } else {
        sendError(res, {
          ...ERRORS.DEFAULT,
          message: `${ERRORS.DEFAULT}: ${err.message}`,
        });
      }
    });
};

export const updateUserAvatar = (req: Request, res: Response) => {
  const id = (req as TRequestWithId).user._id;
  const { avatar }: Pick<IUser, 'avatar'> = req.body;

  if (!mongoose.isValidObjectId(id)) {
    sendError(res, ERRORS.INCORRECT_USER_ID);
    return;
  }

  if (avatar?.length) {
    sendError(res, ERRORS.INCORRECT_DATA);
    return;
  }

  User.findByIdAndUpdate(
    id,
    {
      avatar,
    },
    {
      new: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        sendError(res, {
          ...ERRORS.INCORRECT_DATA,
          message: `${ERRORS.INCORRECT_DATA}: ${err.message}`,
        });
      } else {
        sendError(res, {
          ...ERRORS.DEFAULT,
          message: `${ERRORS.DEFAULT}: ${err.message}`,
        });
      }
    });
};
