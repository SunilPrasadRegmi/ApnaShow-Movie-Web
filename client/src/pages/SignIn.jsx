import { Link } from "react-router-dom";
import bg from "../assets/backgroundImage.png";
import { useContext, useState } from "react";
import axios from "../config/axios"
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {setUser} = useContext(userContext)
    
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    setLoading(true);

    const setErrors = (message) => {
      setError(message);
      setTimeout(() => {
        setError("");
      }, 2000);
        setLoading(false);
        return;
    };

    if (!isOpen && !email || isOpen && !phone || !password) {
      setErrors("All fields are required");
        return;
    }

    if (password.length < 6) {
      setErrors("Password must be at least 6 characters long");
      return;
    }

    if (isOpen &&!phone.match(/^[0-9]{10}$/)) {
      setErrors("Please enter a valid 10-digit phone number");
      return;
    }

    if (!isOpen && !email.includes("@")) {
        setErrors("Please enter a valid email address");
        return;
    }

    try {
      const res = await axios.post("/login", {
        email,
        phone,
        password
        });
        // console.log(res.data);
        setEmail("");
        setPassword("");
        setPhone("");
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        setLoading(false);
        navigate("/");
    } catch (error) {
      // console.log(error);
      setErrors(error.response.data.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form 
        onSubmit={handleSubmit}
        className="w-[90%] h-[600px] max-w-[500px] bg-white/2 opacity-90 backdrop-blur-md shadow-lg rounded-lg shadow-black flex flex-col items-center gap-5">
        <div className="p-10 flex flex-col gap-8 w-full text-white">
          <h1 className="text-2xl font-bold text-center text-white pb-10">
            Sign In to <span className="text-blue-700">Apana Show</span>{" "}
          </h1>
          <div className={`flex items-center justify-between px-2 ${isOpen ? "hidden" : ""}`}>Email<span onClick={() => setIsOpen(true)}  className="cursor-pointer active:scale-95">Phone</span></div>
          <div className={`flex items-center justify-between px-2 ${isOpen ? "" : "hidden"}`}>Phone<span onClick={() => setIsOpen(false)} className="cursor-pointer active:scale-95" >Email</span></div>
          {!isOpen ? (
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-3 px-5 -mt-5 rounded-full focus:outline-none focus:border-blue-500 "
            />
          ) : (
            <input
              type="phone"
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 p-3 px-5 -mt-5 rounded-full focus:outline-none focus:border-blue-500 "
            />
          )}
          
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 px-5 rounded-full focus:outline-none focus:border-blue-500 "
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-gray-50 cursor-pointer rounded-full text-black p-2 hover:bg-white transition duration-300 w-50"
        disabled={loading}
        >
            {loading ? "Loading..." : "Sign In"}
        </button>
        <p className="text-white">
          Want  to create a new account?{" "}
          <Link
            to="/SignUp"
            className="text-blue-800 font-semibold cursor-pointer"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
