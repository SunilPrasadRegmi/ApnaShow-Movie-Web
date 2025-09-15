import { XIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import Loading from "./Loading";
import toast, { Toaster } from "react-hot-toast";

const Profile = ({ isOpen, setIsOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await axios.get("/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Logout successful");
      localStorage.removeItem("token");
      navigate("/Signin");
       window.location.reload();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`absolute mt-2 max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-xl backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${
        isOpen ? "max-md:w-full" : "max-md:w-0 hidden"
      }`}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <XIcon
        className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
      <ul className="flex flex-col gap-5 group-hover:not-hover:opacity-40 hover:-translate-y-1 duration-300 transition cursor-pointer">
        <Link
          to="/my-bookings"
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
        >
          My Bookings
        </Link>
        <Link
          to="/profile/356/editdetails"
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
        >
          Edit Profile
        </Link>
        <Link
          to="/profile/235/editpassword"
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
        >
          Edit Password
        </Link>
        {!isLoading ? (
          <button
            onClick={() => {
              scrollTo(0, 0);
              setIsOpen(false);
              handleLogout();
            }}
            className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-light transition rounded-full font-medium cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <Loading />
        )}
      </ul>
    </div>
  );
};

export default Profile;
