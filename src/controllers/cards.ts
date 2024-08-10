import type { Request, Response } from 'express';
import type { TRequestWithId, ICard } from 'types';
import { Card } from '../models';

export const getAllCards = (req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send({
      data: cards,
    }))
    .catch((err: Error) => res.status(500).send({
      message: `Произошла ошибка: ${err.message}`,
    }));
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then((card) => res.send({
      data: card,
    }))
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка: ${err.message}`,
    }));
};

export const createCard = (req: Request, res: Response) => {
  const id = (req as TRequestWithId).user._id;
  const {
    name, link,
  }: Pick<ICard, 'name' | 'link'> = req.body;

  Card.create({
    name, link, owner: id, likes: [], createdAt: Date.now(),
  })
    .then((card) => res.send({
      data: card,
    }))
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка: ${err.message}`,
    }));
};

export const likeCard = (req: Request, res: Response) => {
  const id = (req as TRequestWithId).user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: id } },
    { new: true },
  )
    .then((card) => res.send({
      data: card,
    }))
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка: ${err.message}`,
    }));
};

export const dislikeCard = (req: Request, res: Response) => {
  const id = (req as TRequestWithId).user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: id } },
    { new: true },
  )
    .then((card) => res.send({
      data: card,
    }))
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка: ${err.message}`,
    }));
};
