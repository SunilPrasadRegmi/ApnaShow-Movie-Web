import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CalendarIcon, ClockIcon } from "lucide-react";
import logo from "../assets/nameLogo.svg"

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/src/assets/backgroundImage.png")] bg-cover bg-center h-screen'>
      <img src={logo} alt="img" className="max-h-20 lg:h-20 mt-20 " />
      <h1 className="text-5xl font-semibold md:text-[70px] md:leading-18 max-w-110">
        Guardians <br /> of the Galaxy
      </h1>
      <div className="flex items-center gap-4 text-gray-300">
        <span>Action | Adventure | Sci-Fi</span>
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-4.5 h-4.5" />
          2023
        </div>
        <div className="flex items-center gap-1">
          <ClockIcon className="w-4.5 h-4.5" />
          2h 8m
        </div>
      </div>
      <p className="max-w-md text-gray-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea fugiat
        aliquam inventore corporis natus dicta doloremque dolores temporibus
        voluptatem ipsum blanditiis
      </p>
      <button
        onClick={() => {navigate("/movies"); scrollTo(0, 0);}}
        className="flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-light transition rounded-full font-medium cursor-pointer group"
      >
        Explore Movies{" "}
        <ArrowRight className="group-hover:translate-x-0.5 transition w-5 h-5" />
      </button>
    </div>
  );
};

export default HeroSection;
