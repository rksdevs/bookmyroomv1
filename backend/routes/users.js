import express from "express";
import {
  getAllUsers,
  getSpecificUser,
  updateUser,
  deleteUser,
} from "../controllers/UserController.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Auth endpoint sucessfully connected!");
// });

//CRUD

//Read Specific user
router.get("/:id", verifyUser, getSpecificUser);
//Read All Users
router.get("/", verifyAdmin, getAllUsers);
//Update User
router.put("/:id", verifyUser, updateUser);
//Delete User
router.delete("/:id", verifyUser, deleteUser);

export default router;
