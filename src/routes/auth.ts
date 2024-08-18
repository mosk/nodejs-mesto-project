import { Router } from 'express';
import { celebrate } from 'celebrate';
import { ROUTE } from '../consts';
import { validateNewUser } from '../middlewares/validate';
import { login, createUser } from '../controllers/auth';

const router = Router();

router.post(ROUTE.SIGN_IN, celebrate(validateNewUser), login);
router.post(ROUTE.SIGN_UP, celebrate(validateNewUser), createUser);

export default router;
