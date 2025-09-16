import userModel from "../../models/user.model.js";
import showModel from "../../models/show.model.js";
import bookingModel from "../../models/booking.model.js";

//ApI to check if user is admin
export const isAdmin = async (req, res) => {
    res.json({ success: true, isAdmin: true});
}

//API to get dashboard data
export const getDashboardData = async (req, res) => {
    try {
        const bookings = await bookingModel.find({isPaid: true});
        const activeShows = await showModel.find({showDateTime: {$gte: new Date()}}).populate('movie');
        const totalUser = await userModel.countDocuments({});

        const dashboardData = {
            totalBookings: bookings.length,
            totalRevenue: bookings.reduce((total, booking) => total + booking.amount, 0),
            activeShows,
            totalUser,
        }

        res.status(200).json({success: true, message: 'Dashboard data fetched successfully', dashboardData});
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching dashboard data', error: error.message });
    }
}

//API to get all shows
export const getAllShows = async (req, res) => {
    try {
        const shows = await showModel.find({showDateTime: {$gte: new Date()}}).populate('movie').sort({showDateTime: 1});
        res.status(200).json({success: true, message: 'Shows fetched successfully', shows});
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching shows', error: error.message });
    }
}

//API to get all bookings
export const getAllBookings = async (req,res) =>{
    try {
        const bookings = await bookingModel.find({}).populate('user').populate({
            path: 'show',
            populate: {
                path: 'movie',
            },
        }).sort({createdAt: -1});
        res.status(200).json({success: true, message: 'Bookings fetched successfully', bookings});
    }catch(error) {

 }
}