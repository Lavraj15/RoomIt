"use client";

import { useEffect, useState } from "react";
import { use } from "react";

import api from "../../../services/api";

import SlotGrid from "../../../components/SlotGrid";
import BookingForm from "../../../components/BookingForm";

export default function RoomPage({
  params,
}) {
  const { id } = use(params);

  const [date, setDate] =
    useState("");

  const [slots, setSlots] =
    useState([]);

  const [selectedSlots,
    setSelectedSlots] =
    useState([]);

  const [formData,
    setFormData] = useState({
    bookedByName: "",
    bookedByEmail: "",
    title: "",
  });

  useEffect(() => {
    if (date) {
      fetchAvailability();
    }
  }, [date]);

const fetchAvailability =
async () => {

try {

const res =
await api.get(

`/rooms/${id}/availability?date=${date}`

);

setSlots(res.data);

}

catch(err){

alert(
"Unable to fetch availability"
);

}

};

  const handleBooking =
    async () => {
      try {
        await api.post(
          "/bookings",
          {
            roomId: id,
            date,
            slots:
              selectedSlots,
            ...formData,
          }
        );

        alert(
          "Booking Created"
        );

        fetchAvailability();

        setSelectedSlots([]);
      } catch (err) {
        alert(
          err.response?.data
            ?.message ||
            "Booking Failed"
        );
      }
    };

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h1 className="
text-5xl
font-bold
mb-8
text-center
">

🏢 Room Booking
</h1>

      <input
  type="date"
  className="
    bg-gray-800
    text-white
    border
    border-gray-600
    rounded-xl
    p-3
    mb-6
    shadow
    focus:outline-none
    focus:ring-2
    focus:ring-indigo-500
  "
  min={new Date().toISOString().split("T")[0]}
  value={date}
  onChange={(e) =>
    setDate(e.target.value)
  }
/>


      <SlotGrid
        slots={slots}
        selectedSlots={
          selectedSlots
        }
        setSelectedSlots={
          setSelectedSlots
        }
      />

      <BookingForm
        formData={formData}
        setFormData={
          setFormData
        }
        handleBooking={
          handleBooking
        }
      />
    </div>
  );
}