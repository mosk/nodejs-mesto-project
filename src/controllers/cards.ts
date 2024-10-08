import type { NextFunction, Request, Response } from 'express';
import type { ICard } from 'types';

import mongoose from 'mongoose';
import { ErrorForbidden, ErrorNotFound, ErrorReqData } from '../errors';
import { MESSAGE } from '../consts';

import { Card } from '../models';

export const getAllCards = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const { _id: userId } = res.locals.user;

  if (!mongoose.isValidObjectId(cardId)) next(new ErrorReqData(MESSAGE.BAD_CARD_ID));

  try {
    const card = await Card.findById(cardId);

    if (!card) throw new ErrorNotFound(MESSAGE.NOT_FOUND_CARD);

    if (userId !== String(card.owner)) throw new ErrorForbidden(MESSAGE.FORBIDDEN);

    const removedCard = await Card.deleteOne({ _id: cardId });

    res.send(removedCard);
  } catch (err) {
    next(err);
  }
};

export const createCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, link }: Pick<ICard, 'name' | 'link'> = req.body;
  const { _id: userId } = res.locals.user;

  try {
    const card = await Card.create({
      name,
      link,
      owner: userId,
      likes: [],
      createdAt: Date.now(),
    });

    res.send(card);
  } catch (err) {
    if ((err as Error).name === 'ValidationError') {
      next(new ErrorReqData(MESSAGE.BAD_DATA));
    } else {
      next(err);
    }
  }
};

export const likeCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const { _id: userId } = res.locals.user;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );

    res.send(card);
  } catch (err) {
    next(err);
  }
};

export const dislikeCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const { _id: userId } = res.locals.user;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    );

    res.send(card);
  } catch (err) {
    next(err);
  }
};
