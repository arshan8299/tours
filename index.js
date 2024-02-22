const express = require('express');
const mongoose = require('mongoose');
const hotelRoute = require('./routes/hotel');
const authRoute = require('./routes/auth');
const roomRoute = require('./routes/room');
const cors = require('cors');

const mongoURI = "mongodb+srv://arshangamer43:123456712@cluster0.1tcodmb.mongodb.net/yourdbname"; // Include your database name
const PORT = 6002;
   
const connect = async () => {
  try {
    await mongoose.connect(mongoURI); 
    console.log("Database connected");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
};

connect();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/hotel', hotelRoute);
app.use('/user', authRoute);
app.use('/room', roomRoute);

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
