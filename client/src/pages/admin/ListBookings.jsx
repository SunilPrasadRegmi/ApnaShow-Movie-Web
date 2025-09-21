import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
// import { dummyBookingData } from "../../assets/assets";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";
import axios from "../../config/axios";

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllBookings = async () => {
    try {
      const res = await axios.get('/admin/all-bookings');
      // console.log(res.data); 
      setBookings(res.data.bookings);
      setLoading(false);
    }catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return !loading ? (
    <>
      <Title text1="Bookings" text2="List" />
      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead className="bg-primary/20 text-left text-white">
          <tr>
            <th className="p-2 font-medium pl-5">User Name</th>
            <th className="p-2 font-medium">Movie Name</th>
            <th className="p-2 font-medium">Show Time</th>
            <th className="p-2 font-medium">Seats</th>
            <th className="p-2 font-medium">Amount</th>
          </tr>
          </thead>
          <tbody className="text-sm font-light">
            {bookings.map((item, index) => (
              <tr
                key={index}
                className="border-b border-primary/10 bg-primary/5 even:bg-primary/10 "
              >
                <td className="p-2 min-w-45 pl-5">{item.user.name}</td>
                <td className="p-2 ">{item.show.movie.title}</td>
                <td className="p-2">{dateFormat(item.show.showDateTime)}</td>
                <td className="p-2">
                  {/* {Object.keys(item.bookedSeats).map(seat => item.bookedSeats[seat].join(", "))} */}
                  {Array.isArray(item.bookedSeats) ? item.bookedSeats.join(", ") : String(item.bookedSeats)}
                </td>
                <td className="p-2">
                  {currency}
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ListBookings;
