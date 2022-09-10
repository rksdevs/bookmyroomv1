import express from "express";
import {
  createHotel,
  getSpecificHotel,
  updateHotel,
  deleteHotel,
  getAllHotels,
  countByCity,
  countByType,
  getHotelRooms,
} from "../controllers/HotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create Hotel
router.post("/", verifyAdmin, createHotel);
//Read Specific Hotel
router.get("/find/:id", getSpecificHotel);
//Read All Hotels
router.get("/", getAllHotels);
//Update Hotel
router.put("/:id", verifyAdmin, updateHotel);
//Delete Hotel
router.delete("/:id", verifyAdmin, deleteHotel);
//endpoints for featured lists and hotels
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
