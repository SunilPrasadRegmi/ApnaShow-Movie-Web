import bookingModel from "../../models/booking.model.js";

export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await bookingModel.find({user}).populate({
            path: 'show',
            populate: {
                path: 'movie',
            },
        }).sort({createdAt: -1});
        res.status(200).json({success: true, message: 'User bookings fetched successfully', bookings});
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching user bookings', error: error.message });
    }
}