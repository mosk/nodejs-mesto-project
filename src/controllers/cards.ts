import type { Request, Response } from 'express';
import type { TRequestWithId, ICard } from 'types';
import mongoose from 'mongoose';
import { sendError } from '../helpers/sendError';
import ERRORS from '../consts/errors';
import { Card } from '../models';

export const getAllCards = (req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => sendError(res, {
      ...ERRORS.DEFAULT,
      message: `${ERRORS.DEFAULT}: ${err.message}`,
    }));
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;

  if (!mongoose.isValidObjectId(cardId)) {
    sendError(res, ERRORS.INCORRECT_CARD_ID);
    return;
  }

  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        sendError(res, ERRORS.NOT_FOUND_CARD);
        return;
      }

      res.send(card);
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

export const createCard = (req: Request, res: Response) => {
  const id = (req as TRequestWithId).user._id;
  const {
    name, link,
  }: Pick<ICard, 'name' | 'link'> = req.body;

  if (!mongoose.isValidObjectId(id)) {
    sendError(res, ERRORS.INCORRECT_USER_ID);
    return;
  }

  if (name.length || link.length) {
    sendError(res, ERRORS.INCORRECT_DATA);
    return;
  }

  Card.create({
    name, link, owner: id, likes: [], createdAt: Date.now(),
  })
    .then((card) => {
      if (!card) {
        sendError(res, ERRORS.INCORRECT_DATA);
        return;
      }

      res.send(card);
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

export const likeCard = (req: Request, res: Response) => {
  const id = (req as TRequestWithId).user._id;
  const { cardId } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    sendError(res, ERRORS.INCORRECT_USER_ID);
    return;
  }

  if (!mongoose.isValidObjectId(cardId)) {
    sendError(res, ERRORS.INCORRECT_CARD_ID);
    return;
  }

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        sendError(res, ERRORS.INCORRECT_DATA);
        return;
      }

      res.send(card);
    })
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка: ${err.message}`,
    }));
};

export const dislikeCard = (req: Request, res: Response) => {
  const id = (req as TRequestWithId).user._id;
  const { cardId } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    sendError(res, ERRORS.INCORRECT_USER_ID);
    return;
  }

  if (!mongoose.isValidObjectId(cardId)) {
    sendError(res, ERRORS.INCORRECT_CARD_ID);
    return;
  }

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        sendError(res, ERRORS.INCORRECT_DATA);
        return;
      }

      res.send(card);
    })
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка: ${err.message}`,
    }));
};
