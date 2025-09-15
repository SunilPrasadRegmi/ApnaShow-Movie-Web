import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { LayoutDashboardIcon, PlusSquareIcon } from 'lucide-react'
import { NavLink} from 'react-router-dom'
// import axios from '../config/axios'
import { userContext } from '../context/UserContext'

const Sidebar = () => {
    // const [user, setUser] = useState('');
    // const [loading, setLoading] = useState(false);
    const {user} = useContext(userContext);

    const adminNAvlinks = [
        {name: 'Edit Details', path: '/profile/154/editdetails', icon: PlusSquareIcon},
        {name: 'Edit Password', path: '/profile/875/editpassword', icon: LayoutDashboardIcon}
    ]
    //  const handleProfile = async () => {
    //     try {
    //       const token = localStorage.getItem('token')
    //       setLoading(true);
    //       const res = await axios.get('/profile',{
    //         headers: {
    //           Authorization: `Bearer ${token}`
    //         }
    //       }); 
    //       setUser(res.data.data);
    //       setLoading(false);
        
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }

    
    // useEffect(() => {
    //     handleProfile();
    //   }, [])

  return (
    <div className='h-[calc(100vh-70px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/30 text-sm'>
        <img src={assets.profile} alt="sidebar" />
        <p className='mt-3 text-base max-md:hidden font-semibold'>{user?.name}</p>
        <div className='text-md text-gray-50 font-semibold w-full max-md:hidden flex flex-col mt-2 gap-2 p-1'>
            <p className='flex items-center justify-between'>Phone<span>{user?.phone}</span></p>
            <p className='flex items-center justify-between'>Email<span>{user?.email}</span></p>
        </div>
        <div className='w-full'>
            {adminNAvlinks.map((link, index) => (
                <NavLink to={link.path} key={index} end  className={({ isActive }) => `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 min-md:pl-10 first:mt-6 text-gray-400 ${isActive && 'bg-primary/15 text-primary group'}`}>
                {({isActive})=>(
                        <>
                            <link.icon className='w-5 h-5' />
                            <p className='max-md:hidden'>{link.name}</p>
                            <span className={`w-1.5 h-10 rounded-l right-0 absolute ${isActive && 'bg-primary' }`}></span>
                        </>
                    )}
                </NavLink>
            ))}
        </div>
            {/* <button   className="px-4 max-md:hidden mt-5 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-light transition rounded-full font-medium cursor-pointer active:scale-95">
            LogOut
          </button>
          <div className='w-full flex items-center mt-2 justify-center text-gray-400'>
            <LogOut onClick={handleLogOut} className='md:hidden w-5 h-5 cursor-pointer active:scale-95'/>
          </div> */}
    </div>
  )
}

export default Sidebar