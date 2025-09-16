import {validationResult} from 'express-validator'
import movieModel from '../../models/movie.model.js'
import ShowModel from '../../models/show.model.js'
import axios from 'axios'

export const getNowPlayingMovies = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {title} = req.body;

        const BASE_URL = process.env.OMDB_API_URL;
        const API_KEY = process.env.OMDM_API_KEY;  

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        // const res = await axios.get(`${BASE_URL}/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`)
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&t=${title}`)
        // const res = await axios.get(`https://api.tvmaze.com/shows/2`);
        console.log(response.data);
        const data = response.data;
        res.status(200).json({success: true, message: 'Movies fetched successfully', data});
    } catch(error) {
        res.status(500).json({ message: 'Server error while fetching movies', error: error.message });
    }
}

export const createMovieShow = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try { 
        const {movieID, showsInput, showPrice} = req.body;

        let movie = await movieModel.findById({_id : movieID});

        const BASE_URL = process.env.OMDB_API_URL;
        const API_KEY = process.env.OMDM_API_KEY;

        if (!movie) {
            const [movieDetailsResponse] = await Promise.all([
                axios.get(`${BASE_URL}?i=${movieID}&apikey=${API_KEY}`),
            ]);

            const movieDetails = movieDetailsResponse.data;

            const movieDetailsModel = {
                title: movieDetails.Title,
                release_date: movieDetails.Released,
                poster_path: movieDetails.Poster,
                backdrop_path: movieDetails.Poster,
                original_language: movieDetails.Language,
                overview: movieDetails.Plot,
                vote_average: movieDetails.Ratings[0].Value,
                runtime: movieDetails.Runtime,
                genres: movieDetails.Genre, //.map(genre => genre.name)
                cast: movieDetails.Actors, //.map(actor => actor.name)
                 _id: movieDetails.imdbID,
            }

            // Create a new movie
            movie = await movieModel.create(movieDetailsModel);
        }

        const showsToCreate = [];
        const showsArray = Object.entries(showsInput).map(([date, times]) => ({
          date,
          times
        }));
        showsArray.forEach(show => {
            const showDate = show.date;
            show.times.forEach(time => {
              const dateTimeString = `${showDate}T${time}`;
              showsToCreate.push({
                movie: movieID,
                showDateTime: new Date(dateTimeString),
                occupiedSeats: {},
                showPrice
              })  
            })
        });

        if(showsToCreate.length > 0) {
            await ShowModel.insertMany(showsToCreate);
        }

        res.status(201).json({success: true, message: 'Movie show created successfully', data: movie});
    } catch (error) {
        res.status(500).json({ message: 'Server error while creating movie show', error: error.message });
    }
}

// get all shows
export const getShows = async (req,res) => {
    try {
        // const shows = await ShowModel.find({showDateTime: {$gte: new Date()}}).populate('movie').toSorted({showDateTime: 1});
        const shows = await ShowModel.find({ showDateTime: { $gte: new Date()}}).populate('movie').sort({ showDateTime: 1 });

        // console.log(shows);
        const uniqueShows = new Set(shows.map(show => show.movie))
        // console.log(uniqueShows);

        res.status(200).json({success: true, message: 'Shows fetched successfully', data: Array.from(uniqueShows)});
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching shows', error: error.message });
    }
}

//get single show
export const getShow = async (req,res) => {
    try {
        const {movieId} = req.params;
        //get all upcoming shows for the movie
        const shows = await ShowModel.find({movie: movieId, showDateTime: {$gte: new Date()}});

        const movie = await movieModel.findById(movieId);
        const dateTime = {};

        shows.forEach((show) => {
            const date = show.showDateTime.toISOString().split('T')[0];
            if(!dateTime[date]) {
                dateTime[date] = [];
            }
            dateTime[date].push({time: show.showDateTime,showId: show._id});

        });

        res.status(200).json({success: true, message: 'Shows fetched successfully', movie, dateTime});
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching shows', error: error.message });
    }
}