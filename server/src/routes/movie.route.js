import {Router} from "express";
import { createMovieShow, getNowPlayingMovies, getShow, getShows } from "../controllers/index.js";
import { userAuth } from "../middleware/auth.js";

const router = Router();

router.get("/movie", userAuth , getNowPlayingMovies)
router.post("/add", userAuth , createMovieShow)
router.get("/all" , getShows)
router.get("/show/:movieId" , getShow)

export default router