import { Router } from 'express';
import { ROUTE } from './consts';
import { getAllUsers, getUser, createUser } from '../controllers/users';

const router = Router();

router.get(ROUTE.USERS, getAllUsers);
router.get(ROUTE.USERS, getUser);
router.post(ROUTE.USERS, createUser);

export default router;
