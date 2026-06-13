const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Room = require("../models/Room");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const rooms = [
  {
    name: "Conference Room A",
    location: "1st Floor",
    capacity: 10,
  },
  {
    name: "Conference Room B",
    location: "2nd Floor",
    capacity: 8,
  },
  {
    name: "Meeting Room C",
    location: "3rd Floor",
    capacity: 6,
  },
  {
    name: "Board Room",
    location: "4th Floor",
    capacity: 15,
  },
];

const seedData = async () => {
  try {
    await Room.deleteMany();

    await Room.insertMany(rooms);

    console.log("Rooms Seeded");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedData();