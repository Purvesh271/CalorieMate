import { Router } from 'express';
import { login, register, getUserProfile, updateUserProfile } from '../controllers/user.controller.js';
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/login").post(login); //login route

router.route("/register").post(register); //register route

router.route("/getUserProfile").get(protect, getUserProfile); //get user profile route

router.route("/updateProfile").put(protect, updateUserProfile); //update user profile route

// router.route("/get_all_activity").get(getUserHistory);


export default router;