import React, { useState } from 'react'
// import { dummyShowsData } from '../assets/assets'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import axios from '../config/axios'
import { useEffect } from 'react' 
import { useNavigate } from 'react-router-dom'

const Favorite = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  
  const getNowPlayingMovies = async() => {
    try {
      const token = localStorage.getItem('token');
      if(!token){
        navigate('/Signin');
        return;
      }

      const res = await axios.get('/favorites',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(res.data.favoriteMovies);
      // console.log(res.data);
      // console.log(dummyShowsData);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
  return data.length > 0 ? (
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
      <BlurCircle top="150px" left="0" />
      <BlurCircle bottom="50px" right="50px" />
      <h1 className='text-lg font-medium my-4 '>Your Favorite Movies</h1>
      <div className='flex flex-wrap max-sm:justify-center gap-8'>
        {data.map((movie,index) => (
          <MovieCard key={movie.id+index} movie={movie} />
        ))}
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold text-center'>No Movies available</h1>
    </div>
  )
}

export default Favorite