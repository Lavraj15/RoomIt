const Room = require("../models/Room");
const Slot = require("../models/Slot");

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAvailability = async (req, res) => {
  try {
    const { date } = req.query;

    const roomId = req.params.id;

    const bookedSlots = await Slot.find({
      roomId,
      date,
    });

    const allSlots = [];

    for (let h = 9; h < 18; h++) {
      allSlots.push(`${String(h).padStart(2, "0")}:00`);
      allSlots.push(`${String(h).padStart(2, "0")}:30`);
    }

    const result = allSlots.map((slot) => ({
      slot,
      available: !bookedSlots.some(
        (b) => b.slotStart === slot
      ),
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getRooms,
  getAvailability,
};