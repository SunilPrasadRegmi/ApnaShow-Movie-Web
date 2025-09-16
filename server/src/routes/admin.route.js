import {Router} from "express";
import { getAllBookings, getAllShows, getDashboardData, isAdmin } from '../controllers/index.js'

const router = Router();

router.get('/is-admin',  isAdmin)
router.get('/dashboard',  getDashboardData)
router.get('/all-shows',  getAllShows)
router.get('/all-bookings',  getAllBookings)

export default router