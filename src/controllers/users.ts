import type { Request, Response } from 'express';
import type { TRequestWithId, IUser } from 'types';
import { User } from '../models';

export const getUser = (req: Request, res: Response) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.send({
      data: user,
    }))
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка: ${err.message}`,
    }));
};

export const getAllUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send({
      data: users,
    }))
    .catch((err: Error) => res.status(500).send({
      message: `Произошла ошибка: ${err.message}`,
    }));
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar }: IUser = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({
      data: user,
    }))
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка: ${err.message}`,
    }));
};

export const updateUserProfile = (req: Request, res: Response) => {
  const id = (req as TRequestWithId).user._id;
  const { name, about }: Omit<IUser, 'avatar'> = req.body;

  User.findByIdAndUpdate(
    id,
    {
      name, about,
    },
    {
      new: true,
    },
  )
    .then((user) => res.send({
      data: user,
    }))
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка: ${err.message}`,
    }));
};

export const updateUserAvatar = (req: Request, res: Response) => {
  const id = (req as TRequestWithId).user._id;
  const { avatar }: Pick<IUser, 'avatar'> = req.body;

  User.findByIdAndUpdate(
    id,
    {
      avatar,
    },
    {
      new: true,
    },
  )
    .then((user) => res.send({
      data: user,
    }))
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка: ${err.message}`,
    }));
};
