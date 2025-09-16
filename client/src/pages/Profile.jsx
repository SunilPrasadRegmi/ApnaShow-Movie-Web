import React, { useContext, useState } from "react";
import { dummyShowsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import axios from "../config/axios";
import toast, {Toaster} from 'react-hot-toast';
import { userContext } from "../context/UserContext";


const Profile = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  // const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  // const [user, setUser] = useState('');
  // const [show, setShow] = useState(false);
  const {setUser} = useContext(userContext)

  const {action} = useParams();

  const isPassword = action === 'editpassword';
  const isDetails = action === 'editdetails';

  // const handleProfile = async () => {
  //   try {
  //     const token = localStorage.getItem('token')
  //     setLoading(true);
  //     const res = await axios.get('/profile',{
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     }); 
  //     setUser(res.data.data);
  //     setLoading(false);
    
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      setLoading(true);
      const res = await axios.put('/update-details',{
        name,
        email,
        phone
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setName('');
      setEmail('');
      setPhone('');
      setUser(res.data.data);
      window.location.reload();
      toast.success('Profile updated successfully');
      setLoading(false);
    } catch (error) {
       setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  const handleUpdatePassword = async () => {
    try {
      const token = localStorage.getItem('token')
      setLoading(true);
      await axios.put('/update-password',{
       currentPassword:password,
       newPassword
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }); 
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success('Password changed successfully');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  }


  // useEffect(() => {
  //   handleProfile();
  // }, [])
  
  return dummyShowsData.length > 0 ? (
    <div className="relative flex my-20 mb-60 px-2 md:px-10 lg:px-15 overflow-hidden min-h-[90vh]">
      <BlurCircle top="150px" left="0" />
      <BlurCircle bottom="50px" right="50px" />
      <Sidebar />
      
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      {isDetails && <div className="bg-black/30 w-full flex flex-col items-center justify-center md:px-20 px-2 py-2 md:py-8">
            <h1 className="text-2xl font-bold text-start text-white pb-10">
             Change Your <span className="text-blue-700">Details</span>{" "}
            </h1>
        <div className="border-2 border-white/20 flex flex-col items-center justify-center rounded p-2">
          <div className="md:p-10 p-5 flex flex-wrap gap-8 w-full items-center justify-center text-white">
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-3 px-5 rounded-full focus:outline-none focus:border-blue-500 "
            />
            <input
              type="phone"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 p-3 px-5 rounded-full focus:outline-none focus:border-blue-500 "
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-3 px-5 rounded-full focus:outline-none focus:border-blue-500 "
            />
          </div>
          {/* {error && <p className="text-red-500">{error}</p>} */}
          <button
            type="submit"
            className="bg-gray-50 cursor-pointer rounded-full text-black p-2 hover:bg-white transition duration-300 w-50"
            disabled={loading}
            onClick={handleUpdateProfile}
          >
            {loading ? "Loading..." : "Save"}
          </button>
        </div>
      </div>}
      {isPassword && <div className="bg-black/30 w-full flex flex-col items-center justify-center md:px-20 px-2 py-2 md:py-8">
            <h1 className="text-2xl font-bold text-start text-white pb-10">
             Change Your <span className="text-blue-700">Current Password</span>{" "}
            </h1>
        <div className="border-2 border-white/20 flex flex-col items-center justify-center rounded p-2">
          <div className="md:p-10 p-5 flex flex-wrap gap-8 w-full items-center justify-center text-white">
            <input
            type="password"
            placeholder="Current Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 px-5 rounded-full focus:outline-none focus:border-blue-500 "
          />
            <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-300 p-3 px-5 rounded-full focus:outline-none focus:border-blue-500 "
          />
           <input
            type="password"
            placeholder="confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 p-3 px-5 rounded-full focus:outline-none focus:border-blue-500 "
          />
          </div>
          {/* {error && <p className="text-red-500">{error}</p>} */}
          <button
            type="submit"
            className="bg-gray-50 cursor-pointer rounded-full text-black p-2 hover:bg-white transition duration-300 w-50"
            disabled={loading}
            onClick={handleUpdatePassword}
          >
            {loading ? "Loading..." : "Save"}
          </button>
        </div>
      </div>}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center">No Movies available</h1>
    </div>
  );
};

export default Profile;
