const mongoose = require("mongoose");

const RoomsSchema = new mongoose.Schema({
  seats: { type: Number, required: true },
  roomId: { type: Number, required: true, unique: true },
  amenities: { type: Array },
  price: { type: Number },
  bookedStatus: { type: Boolean, default: false },
});

module.exports = mongoose.model("Rooms", RoomsSchema);
