import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from "lucide-react";
// import ass from "../assets/logo.png";
import logo from "../assets/nameLogo.svg"
import Profile from "./Profile";
import { userContext } from "../context/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const {user} = useContext(userContext)
  // const user = {
  //   name: "John Doe",
  //   email: "Q9C2w@example.com",
  // }

  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5">
      <Link to="/" className="max-md:flex-1">
        <img src={logo} alt="icon" className="w-36 h-auto" />
      </Link>
      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${
          isOpen ? "max-md:w-full" : "max-md:w-0"
        }`}
      >
        <XIcon
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />

        <Link
          to="/"
          onClick={() => {
            scrollTo(0, 0); setIsOpen(false);
          }}
        >
          Home
        </Link>
        <Link
          to="/movies"
          onClick={() => {
            scrollTo(0, 0); setIsOpen(false);
          }}
        >
          Movies
        </Link>
        <Link
          to="/"
          onClick={() => {
            scrollTo(0, 0); setIsOpen(false);
          }}
        >
          Theaters
        </Link>
        <Link
          to="/my-bookings"
          onClick={() => {
            scrollTo(0, 0); setIsOpen(false);
          }}
        >
          Releases
        </Link>
        <Link
          to="/favorite"
          onClick={() => {
            scrollTo(0, 0); setIsOpen(false);
          }}
        >
          Favorite
        </Link>
      </div>

      <div className="flex items-center gap-8">
        <SearchIcon className="max-md:hidden  w-6 h-6 cursor-pointer" />
          { !user ? (<button onClick={() => navigate("/signin")}  className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-light transition rounded-full font-medium cursor-pointer">
            Login
          </button>) : (
            <div>
            <div onClick={() => setOpenProfile(!openProfile)} className="px-5 py-3 sm:px-5 sm:py-3 bg-primary/80 hover:bg-primary-light transition rounded-full font-medium cursor-pointer">
              P
            </div>      
              <Profile isOpen={openProfile} setIsOpen={setOpenProfile} />
            </div>
          )}
      </div>

      <MenuIcon
        className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default Navbar;
