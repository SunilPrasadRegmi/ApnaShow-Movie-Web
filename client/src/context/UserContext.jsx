import { createContext, useEffect, useState } from 'react'
import axios from '../config/axios'

export const userContext = createContext();

const UserContext = ({children}) => {
    const [user, setUser] = useState('')
    const [error, setError] = useState('');

    const handleGetProfile = async () => {
      let token = localStorage.getItem('token')
      if (!token) {
        return;
      }

      try {
        const res = await axios.get('/profile',{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });  
        // console.log(res.data);
        setUser(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Unknown error');
      }
    }

  useEffect(() => {
    handleGetProfile();
  }, [])
    
  return (
    <userContext.Provider value={{user, setUser,error}}>
        {children}
    </userContext.Provider>
  )
}

export default UserContext