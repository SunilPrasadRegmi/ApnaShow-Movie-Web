import showModel from "../../models/show.model.js";
import bookingModel from "../../models/booking.model.js";

const checkSeatsAvailability = async (showId, selectedSeats) => {
  try {
    const showData = await showModel.findById(showId);
    if (!showData) return false;

    const occupiedSeats = showData.occupiedSeats;

    const isAnySeatTaken = selectedSeats.some((seat) => occupiedSeats[seat]);

    return !isAnySeatTaken;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const createBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers;

    // Check if seats are available
    const isSeatsAvailable = await checkSeatsAvailability(
      showId,
      selectedSeats
    );

    if (!isSeatsAvailable) {
      res.status(400).json({ message: "Selected seats are already taken" });
      return;
    }

    const showData = await showModel.findById(showId).populate("movie");
    const booking = await bookingModel.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats : selectedSeats,
    });

    selectedSeats.map((seat) => {
        showData.occupiedSeats[seat] = userId;
    })

    showData.markModified('occupiedSeats')
    await showData.save();

    // Stripe Gateway Integration

    res.status(200).json({success: true, message: "Booking created successfully", booking });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error while creating booking",
        error: error.message,
      });
  }
};

export const getOccupiedSeats = async (req, res) => {
    try {
        const {showId} = req.params;
        const showData = await showModel.findById(showId);
        
        const occupiedSeats = Object.keys(showData.occupiedSeats);

        res.status(200).json({success: true, message: 'Occupied seats fetched successfully', data: occupiedSeats});
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching occupied seats', error: error.message });   
    }
}
