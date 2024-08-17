import type { NextFunction, Request, Response } from "express";
import type { ICard } from "types";

import mongoose from "mongoose";
import { ERROR_MSG } from "../consts";
import { ErrorNotFound, ErrorResData } from "errors";

import { Card } from "../models";

export const getAllCards = async (
  req: Request,
  res: Response,
  next: NextFunction
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
  next: NextFunction
) => {
  const { cardId } = req.body;

  if (!mongoose.isValidObjectId(cardId))
    next(new ErrorResData(ERROR_MSG.BAD_CARD_ID));

  try {
    const card = await Card.findByIdAndDelete(cardId);

    if (!card) throw new ErrorNotFound(ERROR_MSG.NOT_FOUND_CARD);

    res.send(card);
  } catch (err) {
    next(err);
  }
};

export const createCard = (req: Request, res: Response) => {
  const id = (req as TRequestWithId).user._id;
  const { name, link }: Pick<ICard, "name" | "link"> = req.body;

  if (!mongoose.isValidObjectId(id)) {
    sendError(res, ERRORS.INCORRECT_USER_ID);
    return;
  }

  if (name.length || link.length) {
    sendError(res, ERRORS.INCORRECT_DATA);
    return;
  }

  Card.create({
    name,
    link,
    owner: id,
    likes: [],
    createdAt: Date.now(),
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

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: id } }, { new: true })
    .then((card) => {
      if (!card) {
        sendError(res, ERRORS.INCORRECT_DATA);
        return;
      }

      res.send(card);
    })
    .catch((err) =>
      sendError(res, {
        ...ERRORS.DEFAULT,
        message: `${ERRORS.DEFAULT}: ${err.message}`,
      })
    );
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

  Card.findByIdAndUpdate(cardId, { $pull: { likes: id } }, { new: true })
    .then((card) => {
      if (!card) {
        sendError(res, ERRORS.INCORRECT_DATA);
        return;
      }

      res.send(card);
    })
    .catch((err) =>
      sendError(res, {
        ...ERRORS.DEFAULT,
        message: `${ERRORS.DEFAULT}: ${err.message}`,
      })
    );
};
