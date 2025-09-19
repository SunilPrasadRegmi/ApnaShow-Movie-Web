import {Router} from "express";
import { body } from "express-validator";
import { getUserBookings,updateFavoriteMovies,getFavoriteMovies } from "../controllers/index.js";
import { userAuth } from "../middleware/auth.js";

const router = Router();

router.get("/bookings", userAuth, getUserBookings)
router.post("/update-favorite", userAuth, updateFavoriteMovies)
router.get("/favorites", userAuth, getFavoriteMovies)

export default router