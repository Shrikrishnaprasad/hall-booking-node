const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  custName: { type: String, required: true },
  roomId: { type: Number, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
});

module.exports = mongoose.model("Booking", BookingSchema);
