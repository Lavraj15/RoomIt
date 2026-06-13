"use client";

import { useState } from "react";
import api from "../../services/api";

export default function BookingsPage() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [showReschedule, setShowReschedule] =
  useState(false);

const [selectedBookingId,
  setSelectedBookingId] =
  useState("");

const [newDate, setNewDate] =
  useState("");

const [newSlot, setNewSlot] =
  useState("");

  const fetchBookings = async () => {
    try {
      const res = await api.get(
        `/bookings?email=${email}`
      );

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = async (id) => {
    try {
      await api.patch(
        `/bookings/${id}/cancel`
      );

      fetchBookings();

      alert("Booking Cancelled");
    } catch (error) {
      console.log(error);
    }
  };

  const rescheduleBooking =
async () => {

try {

await api.patch(

`/bookings/${selectedBookingId}/reschedule`,

{

date: newDate,

slots: [newSlot]

}

);

alert(
"Booking Rescheduled"
);

setShowReschedule(false);

setNewDate("");

setNewSlot("");

fetchBookings();

}

catch(err){

alert(

err.response?.data?.message ||

"Failed"

);

}

};
  return (
    <div className="max-w-5xl mx-auto p-5">
      <h1 className="text-4xl font-bold mb-5">
        My Bookings
      </h1>

      <div className="flex gap-3 mb-5">
        <input
          type="email"
          placeholder="Enter Email"
          className="
bg-gray-800
border
border-gray-600
text-white
rounded-lg
p-3
w-full
"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button
          onClick={fetchBookings}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="bg-gray-900 text-white border-gray-700 shadow-mdhover:shadow-xl transition rounded-2xl p-6 mb-5"
        >
          <h2 className="font-bold">
            {booking.title}
          </h2>

          <p>
            Room:
            {" "}
            {booking.room?.name}
          </p>

          <p>
            Date:
            {" "}
            {booking.date}
          </p>

          <p>
            Time:
            {" "}
            {booking.startTime}
            {" - "}
            {booking.endTime}
          </p>

   <p className="mt-2">

Status:

<span
className={`ml-2 px-3 py-1 rounded-full text-white

${
booking.status === "confirmed"

? "bg-green-500"

: booking.status ===
"cancelled-refundable"

? "bg-blue-500"

: "bg-red-500"

}

`}
>

{booking.status}

</span>

</p>

         {booking.status === "confirmed" && (

<div className="mt-4 flex gap-3">

  <button

    onClick={() =>

      cancelBooking(

        booking._id

      )

    }

    className="
    bg-red-500
    hover:bg-red-600
    text-white
    px-5
    py-2
    rounded-lg
    "
  >

    Cancel Booking

  </button>

  <button

    onClick={() => {

setSelectedBookingId(
booking._id
);

setShowReschedule(
true
);

}}

    className=" bg-indigo-600
    hover:bg-indigo-700 text-white px-5  py-2 rounded-lg"
  >

    Reschedule

  </button>

</div>

)}
        </div>
            ))}

      {showReschedule && (

        <div
          className=" fixed inset-0 bg-black/60 flex items-center justify-center z-50 "
        >

          <div
            className=" bg-slate-900 p-8 rounded-3xl w-[400px] border border-slate-700 "
          >

            <h2
              className=" text-2xl font-bold mb-5 "
            >

              Reschedule Booking

            </h2>

            <input

              type="date"

              className=" w-full bg-gray-800 border border-gray-600 rounded-xl p-3 mb-4 "

              value={newDate}

              onChange={(e)=>

                setNewDate(

                  e.target.value

                )

              }

            />

            <input

              type="time"

              className=" w-full bg-gray-800 border border-gray-600 rounded-xl p-3 mb-6 "
              value={newSlot}
              onChange={(e)=>
                setNewSlot(
                  e.target.value

                )
              }
            />

            <div
              className="
              flex
              gap-3
              justify-end
              "
            >
              <button
                onClick={()=>
                  setShowReschedule(
                    false

                  )
                }
                className="
                bg-gray-700
                px-5
                py-2
                rounded-xl
                "
              >
                Cancel
              </button>

              <button
                onClick={
                  rescheduleBooking
                }
                className=" bg-indigo-600  hover:bg-indigo-700 px-5 py-2 rounded-xl"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}