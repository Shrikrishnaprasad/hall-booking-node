const router = require("express").Router();
const Rooms = require("../models/Rooms");
const Booking = require("../models/Booking");

//create new room
router.post("/create", async (req, res) => {
  const newRoom = new Rooms(req.body);
  try {
    const room = await newRoom.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json(error);
  }
});

// listing all booked rooms
router.get("/listRooms", async (req, res) => {
  try {
    cust = await Booking.find();
    res.status(200).json(cust);
  } catch (error) {
    res.status(500).json(error);
  }
});

// booking a room
router.post("/book", async (req, res) => {
  const newRoom = new Booking({
    custName: req.body.custName,
    roomId: req.body.roomId,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    isBooked: true,
  });
  try {
    const room = await Rooms.findOne({ roomId: req.body.roomId });
    const bookedRoom = await Booking.findOne({
      roomId: req.body.roomId,
      date: new Date(req.body.date),
    });
    //console.log(req.body.date);
    //console.log(bookedRoom);
    if (room.bookedStatus && bookedRoom) {
      res.status(500).json("Already this room is booked!");
    } else {
      const booked = await newRoom.save();
      const updatedRoom = await Rooms.findByIdAndUpdate(
        room._id,
        {
          $set: { bookedStatus: true },
        },
        { new: true }
      );
      res.status(201).json("Your booked room name is : " + booked.roomId);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// listing all customers with booked data
router.get("/listCust", async (req, res) => {
  try {
    cust = await Booking.find({}, { isBooked: 0 });
    res.status(200).json(cust);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
