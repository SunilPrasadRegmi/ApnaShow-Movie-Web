import bookingModel from "../../models/booking.model.js";
import { validationResult } from "express-validator";
import userModel from "../../models/user.model.js";

export const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const bookings = await bookingModel
      .find({ user })
      .populate({
        path: "show",
        populate: {
          path: "movie",
        },
      })
      .sort({ createdAt: -1 });
    res
      .status(200)
      .json({
        success: true,
        message: "User bookings fetched successfully",
        bookings,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error while fetching user bookings",
        error: error.message,
      });
  }
};

//ApI Controller function to Add Favorite Movie in User Collection
export const updateFavoriteMovies = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { movie } = req.body;
    const user = req.user._id;
    const userDoc = await userModel.findById(user);

    let favoriteMovie;
    const movieId = movie._id; // Extract the ID from the movie object


    if (userDoc.favoriteMovies.includes(movieId)) {
      // Movie exists — remove it
      favoriteMovie = await userModel.findOneAndUpdate(
        { _id: user },
        { $pull: { favoriteMovies: movieId } },
        { new: true }
      );
    } else {
      // Movie doesn't exist — add it
      favoriteMovie = await userModel.findOneAndUpdate(
        { _id: user },
        { $addToSet: { favoriteMovies: movieId } },
        { new: true }
      );
    }


    res
      .status(200)
      .json({
        success: true,
        message: "Favorite movie added successfully",
        data:favoriteMovie,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error while adding favorite movie",
        error: error.message,
      });
  }
};

export const getFavoriteMovies = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
  try {
    const user = req.user._id;
    const userDoc = await userModel.findById(user).populate("favoriteMovies");
    res
      .status(200)
      .json({
        success: true,
        message: "Favorite movies fetched successfully",
        favoriteMovies: userDoc.favoriteMovies,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error while fetching favorite movies",
        error: error.message,
      });
  }
}