import {Router} from "express";
import { get } from "mongoose";
import { createMovieShow, getNowPlayingMovies } from "../controllers/index.js";
import { userAuth } from "../middleware/auth.js";

const router = Router();

router.get("/movie", userAuth , getNowPlayingMovies)
router.post("/add", userAuth , createMovieShow)

export default router