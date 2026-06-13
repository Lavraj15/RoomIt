"use client";

import { useEffect, useState } from "react";

import api from "../services/api";
import RoomCard from "../components/RoomCard";

export default function Home() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const res = await api.get("/rooms");

    setRooms(res.data);
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="

text-7xl

font-extrabold

text-center

mb-12

bg-gradient-to-r

from-indigo-400

via-purple-400

to-pink-400

bg-clip-text

text-transparent

">

Meeting Rooms

</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {rooms.map((room) => (
          <RoomCard
            key={room._id}
            room={room}
          />
        ))}
      </div>
    </div>
  );
}