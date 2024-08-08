import type { Request, Response } from 'express';
import { User } from '../models';

export const getAllUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err: Error) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};
