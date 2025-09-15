import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Loading from '../components/Loading';

const AuthUser = ({children}) => {
    const { user , setUser} = useContext(userContext);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // 👉 Function to check token expiry
      const isTokenExpired = (token) => {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000; // seconds में
          return decoded.exp < currentTime;
        } catch (e) {
          console.error(e);
          return true; // invalid token या decode error
        }
      };

    useEffect(() => {
      if(!token || isTokenExpired(token)) {
        localStorage.removeItem('token'); // invalid token remove करो
        setUser(null);
        navigate("/Signin");
      } else {
      setLoading(false);
    }
    }, [token, navigate, user, setUser]);

    if(loading) {
      return <Loading/>
    }

  return (
    <>
        {children}
    </>
  )
}

export default AuthUser