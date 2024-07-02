const express = require("express");
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/dining-place/availability",
  authMiddleware,
  bookingController.checkAvailable
);

router.post(
  "/dining-place/book",
  authMiddleware,
  bookingController.makeBooking
);

module.exports = router;
