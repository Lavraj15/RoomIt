const express = require("express");

const router = express.Router();

const { getRooms,
  getAvailability,

 } = require("../controllers/roomController");

router.get("/", getRooms);
router.get("/:id/availability", getAvailability);

module.exports = router;