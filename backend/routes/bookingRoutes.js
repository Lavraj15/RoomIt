const express = require("express");

const router = express.Router();

const {
  getBookingsByEmail,
  createBooking,
  cancelBooking,
  rescheduleBooking,
} = require("../controllers/bookingController");

router.get("/", getBookingsByEmail);

router.post("/", createBooking);
router.patch("/:id/cancel", cancelBooking);
router.patch("/:id/reschedule", rescheduleBooking);
module.exports = router;