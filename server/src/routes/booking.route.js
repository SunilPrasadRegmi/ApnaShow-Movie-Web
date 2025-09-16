import {Router} from "express";
import { createBooking, getOccupiedSeats } from "../controllers/index.js";
import { userAuth } from "../middleware/auth.js";

const router = Router();

router.post('/create', userAuth, createBooking);
router.get('/seats/:showId', userAuth, getOccupiedSeats);

export default router