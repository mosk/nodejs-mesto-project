import { Router } from 'express';
import { celebrate } from 'celebrate';
import { ROUTE } from '../consts';
import {
  validateUpdateAvatar,
  validateUpdateProfile,
  validateUserId,
} from '../middlewares/validate';
import {
  getAllUsers,
  getUserById,
  getUserCurrent,
  updateUserProfile,
  updateUserAvatar,
} from '../controllers/users';

const router = Router();

router.get(ROUTE.USER, celebrate(validateUserId), getUserById);
router.get(ROUTE.USER_PROFILE, getUserCurrent);
router.get(ROUTE.USERS, getAllUsers);
router.patch(
  ROUTE.USER_PROFILE,
  celebrate(validateUpdateProfile),
  updateUserProfile,
);
router.patch(
  ROUTE.USER_AVATAR,
  celebrate(validateUpdateAvatar),
  updateUserAvatar,
);

export default router;
