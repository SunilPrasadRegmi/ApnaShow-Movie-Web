import React from 'react'
// import { dummyShowsData } from '../assets/assets'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import axios from '../config/axios'
import { useState } from 'react'
import { useEffect } from 'react'

const Movies = () => {
  const [data, setData] = useState([]);
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
    getNowPlayingMovies();
  }, []);
  return data.length > 0 ? (
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
      <BlurCircle top="150px" left="0" />
      <BlurCircle bottom="50px" right="50px" />
      <h1 className='text-lg font-medium my-4 '>Now Showing</h1>
      <div className='flex flex-wrap max-sm:justify-center gap-8'>
        {data.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold text-center'>No Movies available</h1>
    </div>
  )
}

export default Movies