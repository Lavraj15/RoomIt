const mongoose = require("mongoose");
const dayjs = require("dayjs");

const Booking = require("../models/Booking");
const Slot = require("../models/Slot");

// GET bookings by email
const getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    const bookings = await Booking.find({
      bookedByEmail: email,
    }).populate("room");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Helper to calculate end time based on start time
const getEndTime = (time) => {
  const [h, m] = time.split(":").map(Number);

  let totalMinutes = h * 60 + m + 30;

  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

// CREATE booking
// const createBooking = async (req, res) => {
//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     const {
//       roomId,
//       date,
//       slots,
//       bookedByName,
//       bookedByEmail,
//       title,
//     } = req.body;

//     const booking = await Booking.create(
//       [
//         {
//           room: roomId,
//           date,
//           startTime: slots[0],
//           endTime: slots[slots.length - 1],
//           bookedByName,
//           bookedByEmail,
//           title,
//           status: "confirmed",
//         },
//       ],
//       { session }
//     );

//     const slotDocs = slots.map((slot) => ({
//       roomId,
//       date,
//       slotStart: slot,
//       bookingId: booking[0]._id,
//     }));

//     await Slot.insertMany(slotDocs, {
//       session,
//       ordered: true,
//     });

//     await session.commitTransaction();

//     res.status(201).json({
//       success: true,
//       booking: booking[0],
//     });
//   } catch (error) {
//     await session.abortTransaction();

//     if (error.code === 11000) {
//       return res.status(409).json({
//         success: false,
//         message: "Slot already booked",
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   } finally {
//     session.endSession();
//   }
// };
const createBooking = async (req, res) => {
  try {
    const {
      roomId,
      date,
      slots,
      bookedByName,
      bookedByEmail,
      title,
    } = req.body;

    // Validation
    if (
      !roomId ||
      !date ||
      !slots?.length ||
      !bookedByName ||
      !bookedByEmail ||
      !title
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Booking create
    const booking = await Booking.create({
  room: roomId,
  date,
  startTime: slots[0],
  endTime: getEndTime(
    slots[slots.length - 1]
  ),
  bookedByName,
  bookedByEmail,
  title,
  status: "confirmed",
});

    // Slot entries create
    const slotDocs = [];

slots.forEach((slot) => {

  slotDocs.push({

    roomId,

    date,

    slotStart: slot,

    bookingId: booking._id,

  });

});

// Buffer Slot

const lastSlot =
  slots[slots.length - 1];

const [h, m] =
  lastSlot
    .split(":")
    .map(Number);

let total =
  h * 60 + m + 30;

const bufferHour =
  Math.floor(total / 60);

const bufferMinute =
  total % 60;

const bufferSlot =

`${String(
bufferHour
).padStart(2,"0")}:${String(
bufferMinute
).padStart(2,"0")}`;

slotDocs.push({

roomId,

date,

slotStart:
bufferSlot,

bookingId:
booking._id,

});

    try {
      await Slot.insertMany(slotDocs, {
        ordered: true,
      });
    } catch (err) {
      // Duplicate slot
      if (err.code === 11000) {
        await Booking.findByIdAndDelete(
          booking._id
        );

        return res.status(409).json({
          message:
            "One or more slots already booked",
        });
      }

      throw err;
    }

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.status !== "confirmed") {
      return res.status(400).json({
        message: "Booking already cancelled",
      });
    }

    const bookingDateTime = dayjs(
      `${booking.date} ${booking.startTime}`
    );

    const now = dayjs();

    const diffHours = bookingDateTime.diff(now, "hour", true);

    let newStatus = "";

    if (diffHours >= 2) {
      newStatus = "cancelled-refundable";
    } else {
      newStatus = "cancelled-non-refundable";
    }

    booking.status = newStatus;

    await booking.save();

    // Free slots
    await Slot.deleteMany({
      bookingId: booking._id,
    });

    res.status(200).json({
      success: true,
      status: newStatus,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


//resedule
const rescheduleBooking = async (req, res) => {
  try {

    const bookingId = req.params.id;

    const {
      date,
      slots
    } = req.body;

    const booking =
      await Booking.findById(
        bookingId
      );

    if (!booking) {

      return res
        .status(404)
        .json({

          message:
            "Booking not found"

        });

    }

    if (
      booking.status !==
      "confirmed"
    ) {

      return res
        .status(400)
        .json({

          message:
          "Cancelled booking cannot be rescheduled"

        });

    }

    // Purane slots delete

    await Slot.deleteMany({

      bookingId:
      booking._id,

    });

    // Naye slots insert

    const slotDocs =
      slots.map(
        (slot) => ({

          roomId:
          booking.room,

          date,

          slotStart:
          slot,

          bookingId:
          booking._id,

        })
      );

    try {

      await Slot.insertMany(
        slotDocs,
        {

          ordered:
          true,

        }
      );

    }

    catch (err) {

      if (
        err.code ===
        11000
      ) {

        return res
          .status(409)
          .json({

            message:
            "One or more slots already booked"

          });

      }

      throw err;

    }

    booking.date = date;

    booking.startTime =
      slots[0];

    booking.endTime =
      getEndTime(
        slots[
          slots.length - 1
        ]
      );

    await booking.save();

    res.status(200).json({

      success: true,

      booking,

    });

  }

  catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};

module.exports = {
  getBookingsByEmail,
  createBooking,
  cancelBooking,
  rescheduleBooking,
};