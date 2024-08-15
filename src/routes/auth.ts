import { Router } from 'express';
import { ROUTE } from './consts';
import {
  login,
  createUser,
} from '../controllers/auth';

const router = Router();

router.post(ROUTE.SIGN_IN, login);
router.post(ROUTE.SIGN_UP, createUser);

export default router;
