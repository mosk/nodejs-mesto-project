import { Router } from "express";
import { ROUTE } from "consts";
import {
  getAllUsers,
  getUserById,
  getUserCurrent,
  updateUserProfile,
  updateUserAvatar,
} from "../controllers/users";

const router = Router();

router.get(ROUTE.USER, getUserById);
router.get(ROUTE.USER_PROFILE, getUserCurrent);
router.get(ROUTE.USERS, getAllUsers);
router.patch(ROUTE.USER_PROFILE, updateUserProfile);
router.patch(ROUTE.USER_AVATAR, updateUserAvatar);

export default router;
