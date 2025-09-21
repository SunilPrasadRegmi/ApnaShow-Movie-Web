import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import {  dummyShowsData } from '../assets/assets'; {/*dummyDateTimeData*/}
import BlurCircle from '../components/BlurCircle';
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react';
import timeFormat from '../lib/timeFormat';
import DateSelect from '../components/DateSelect';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import axios from '../config/axios';

const MovieDetails = () => {
  const {id} = useParams();
  const [show, setShow] = useState(null);
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState([]);
  const [data, setData] = useState([]);

  const getShow = async () => {
    // const show = dummyShowsData.find(show => show._id === id);
    //   if(show) {  
    //     setShow({
    //       movie: show,
    //       dateTime: dummyDateTimeData
    //     })
    //   }
      try {
        const token = localStorage.getItem('token');
        if(!token){
          return;
        }
        const res = await axios.get(`/show/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // console.log(res.data);
        setShow({
          movie: res.data.movie,
          dateTime: res.data.dateTime
        });
      } catch (error) {
        console.log(error);
      }
    }
    
  const getHandleFavorite = async() => {
    try {
      const token = localStorage.getItem('token');
      if(!token){
        navigate('/Signin');
        return;
      }
      const res = await axios.get(`/favorites`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // console.log(res.data);
    if(res.data.favoriteMovies){
      const movie = res.data.favoriteMovies.find((movie) => movie === id);
      if(movie){
        setFavorite(res.data.favoriteMovies);
      }
    }
    } catch(error){
      console.log(error);
    }
  }

  const handleFavorite = async() => {
    try {
      const token = localStorage.getItem('token');
        if(!token){
          navigate('/Signin');
          return;
        }
        
      const res = await axios.post(`/update-favorite`,{
        movie:show.movie
      },{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(res.data);
    const movie = res.data.data.favoriteMovies.find((movie) => movie === id);
    if(movie){
      setFavorite(res.data.data.favoriteMovies);
    }
    } catch(error){
      console.log(error);
    }
  }

  
    const getNowPlayingMovies = async() => {
      try {
        const res = await axios.get('/all');
        setData(res.data.data);
        // console.log(res.data.data);
        // console.log(dummyShowsData);
      } catch(error) {
        console.log(error);
      }
    }

  useEffect(() => {
    getShow();
  }, [id])

  useEffect(() => {
     getNowPlayingMovies();
      getHandleFavorite();
  },[])
  return show ? (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
    <img src={show.movie.poster_path} alt="img" className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover' />
      <div className='relative flex flex-col gap-3'>
      <BlurCircle top="-100px" left="-100px" />
      <p className='text-primary'>ENGLISH</p>
      <h1 className='text-4xl font-semibold max-w-96 text-balance'>{show.movie.title}</h1>
      <div className='flex items-center gap-2 text-gray-300'>
        <StarIcon className='w-5 h-5 text-primary fill-primary ' />
        {show.movie.vote_average} User Rating{/*.toFixed(1)*/}
      </div>
      <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>{show.movie.overview}</p>
      <p>{timeFormat(show.movie.runtime)}  .  {show.movie.genres && show.movie.genres.map((genre, index) => (
  <span key={index}>{genre}</span>
))}  .  {show.movie.release_date}</p> {/*.split("-")[0] */}
      <div className='flex items-center flex-wrap gap-4 mt-4'>
          <button className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95'>
            <PlayCircleIcon className='w-5 h-5'/>
            Watch Trailer
          </button>
          <a href="#dateSelect" className='px-10 py-3 text-sm bg-primary hover:bg-primary-light transition rounded-md font-medium cursor-pointer active:scale-95'>Buy Tickets</a>
          <button className='bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95'>
            <Heart onClick={handleFavorite} className={`w-5 h-5 ${favorite.find((movie) => movie === id) ? 'fill-primary' : 'fill-gray-400'}`} />
          </button>
      </div>
      </div>
      </div>
      
      <p className='text-lg font-medium mt-20 '>Your Favorite Cast</p>
      <div className='overflow-x-auto no-scrollbar mt-8 pb-4'>
          <div className='flex items-center gap-4 w-max px-4'>
              {show.movie.casts &&show.movie.casts.slice(0,12).map((cast,index)=> (
                <div key={index} className='flex flex-col items-center text-center'>
                  <img src={cast.profile_path} alt="img" className='h-20 md:h-20 aspect-square object-cover rounded-full' />
                  <p className='font-medium text-xs mt-3'>{cast.name}</p>
                </div>
              ))}
          </div>
      </div>

      <DateSelect dateTime={show.dateTime} id={id}/>    

      <p className='text-lg font-medium mt-20 mb-8'>You May Also Like</p>    
      <div className='flex flex-wrap max-sm:justify-center gap-8'>
          {data.slice(0,4).map((show,index) => (
            <MovieCard movie={show} key={index} />
          ))}
      </div>
      <div className='flex justify-center mt-20'>
          <button onClick={() => {navigate("/movies");scrollTo(0,0);}} className='px-10 py-3 text-sm bg-primary hover:bg-primary-light transition rounded-md font-medium cursor-pointer'>Show more</button>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default MovieDetails