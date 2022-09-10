import express from "express";
import {
  deleteRoom,
  createRoom,
  getAllRooms,
  getSpecificRoom,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/RoomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Auth endpoint sucessfully connected!");
// });

//CRUD

//Create Hotel
router.post("/:hotelId", verifyAdmin, createRoom);
//Read Specific Hotel
router.get("/:id", getSpecificRoom);
//Read All Hotels
router.get("/", getAllRooms);
//Update Hotel
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

//Delete Hotel
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

export default router;
