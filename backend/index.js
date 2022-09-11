import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectToDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

//importing all the routes
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";

const app = express();
dotenv.config();

//checking mongoDB database integration
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected!");
});

//testing api endpoints
// app.get("/", (req, res) => {
//   res.send("Endpoint connected");
// });

//middlewares
//to be able to send/receive json in express
app.use(cookieParser());
app.use(express.json());
app.use(cors());

//implementing routes middlewares
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);

app.listen(8800, () => {
  connectToDb();
  console.log("Connected to port 8800");
});
