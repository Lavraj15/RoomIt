const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Booking = require("../models/Booking");
const Room = require("../models/Room");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedBookings = async () => {
  try {
    const rooms = await Room.find();

    if (!rooms.length) {
      console.log("Please seed rooms first");
      process.exit();
    }

    await Booking.deleteMany();

    await Booking.create([
      {
        room: rooms[0]._id,
        date: "2026-06-15",
        startTime: "10:00",
        endTime: "11:00",
        bookedByName: "John",
        bookedByEmail: "john@test.com",
        title: "Sprint Planning",
      },
      {
        room: rooms[1]._id,
        date: "2026-06-15",
        startTime: "14:00",
        endTime: "15:00",
        bookedByName: "David",
        bookedByEmail: "david@test.com",
        title: "Team Meeting",
      },
    ]);

    console.log("Bookings Seeded");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedBookings();