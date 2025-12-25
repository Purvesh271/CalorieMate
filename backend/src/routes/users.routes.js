import { Router } from 'express';
import { login, register} from '../controllers/user.controller.js';
const router = Router();

router.route("/login").post(login); //login route

router.route("/register").post(register); //register route


// router.route("/add_to_activity").post(addToHistory); 
// router.route("/get_all_activity").get(getUserHistory);

// router.route("/get_profile").get(getUserProfile);


// router.route("/get_todaycal").get(todayCal);


export default router;