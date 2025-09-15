import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import SeatLayout from "../pages/SeatLayout";
import MyBookings from "../pages/MyBookings";
import MovieDetails from "../pages/MovieDetails";
import Favorite from "../pages/Favorite";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import Layout from "../pages/admin/Layout";
import Dashboard from "../pages/admin/Dashboard";
import AddShow from "../pages/admin/AddShows";
import ListShows from "../pages/admin/ListShows";
import ListBookings from "../pages/admin/ListBookings";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import AuthUser from "../auth/AuthUser";

const AppRoutes = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route
          path="/movies/:id/:date"
          element={
            <AuthUser>
              <SeatLayout />
            </AuthUser>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <AuthUser>
              <MyBookings />
            </AuthUser>
          }
        />
        <Route path="/favorite" element={<Favorite />} />
        <Route
          path="/profile/:id/:action"
          element={
            <AuthUser>
              <Profile />
            </AuthUser>
          }
        />
        <Route path="/admin/*" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-show" element={<AddShow />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default AppRoutes;
