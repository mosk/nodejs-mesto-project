import { Router } from "express";
import { ROUTE } from "consts";
import {
  getAllCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} from "../controllers/cards";

const router = Router();

router.get(ROUTE.CARDS, getAllCards);
router.delete(ROUTE.CARD, deleteCard);
router.post(ROUTE.CARDS, createCard);
router.put(ROUTE.CARD_LIKE, likeCard);
router.delete(ROUTE.CARD_LIKE, dislikeCard);

export default router;
