const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const roomsRoute = require("./routes/rooms");

dotenv.config();
app.use(express.json());
app.use(cors());
//db config
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MONGODB Connected successfully"))
  .catch((err) => console.log(err));

app.use("/rooms", roomsRoute);
app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
