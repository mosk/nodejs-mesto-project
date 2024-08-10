import { Router } from 'express';
import { ROUTE } from './consts';
import {
  getAllUsers,
  getUser,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} from '../controllers/users';

const router = Router();

router.get(ROUTE.USER, getUser);
router.get(ROUTE.USERS, getAllUsers);
router.post(ROUTE.USERS, createUser);
router.patch(ROUTE.USER_PROFILE, updateUserProfile);
router.patch(ROUTE.USER_AVATAR, updateUserAvatar);

export default router;
