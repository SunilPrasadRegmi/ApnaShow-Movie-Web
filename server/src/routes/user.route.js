import {Router} from "express";
import { body } from "express-validator";
import { registerController, loginController, getProfileController,updatePassword, updateDetails, logOutController } from "../controllers/index.js";
import { userAuth } from "../middleware/auth.js";

const router = Router();

router.post("/register",
    body("name").isString().withMessage("Name must be a string"),
    body("email").isEmail().withMessage("Email must be a valid email"),
    body("password").isString().withMessage("Password must be a string"),
    body("phone").isString().withMessage("Phone must be a string"),
    registerController
)

router.post("/login",
   body("password").isString().withMessage("Password must be a string"),
   loginController
)

router.get("/profile", userAuth, getProfileController)

router.put("/update-details", userAuth, updateDetails)

router.put("/update-password", userAuth, updatePassword)

router.get("/logout", userAuth, logOutController)

export default router