import { Router } from 'express';
import { ROUTE } from 'consts';
import { celebrate } from 'celebrate';
import { validateCardId, validateNewCard } from 'middlewares/validate';
import {
  getAllCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';

const router = Router();

router.get(ROUTE.CARDS, getAllCards);
router.delete(ROUTE.CARD, celebrate(validateCardId), deleteCard);
router.post(ROUTE.CARDS, celebrate(validateNewCard), createCard);
router.put(ROUTE.CARD_LIKE, celebrate(validateCardId), likeCard);
router.delete(ROUTE.CARD_LIKE, celebrate(validateCardId), dislikeCard);

export default router;
