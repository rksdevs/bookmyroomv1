import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

//Create Room & push the new room id into the Hotel's document -updating the hotel doc
export const createRoom = async (req, res) => {
  const hotelId = req.params.hotelId; //the new room must be added to the hotel with the same id which was passed in param
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save(); //saved the new room

    //Push the room id into the hotel - to establish room's relation with the hotel
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id }, // pushing the new room's id into the Hotel document
      });
    } catch (error) {
      console.log("Error from saving room id to the hotel", error);
      res.status(500).json(error);
    }

    res.status(200).json(savedRoom);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Read Room - specific
export const getSpecificRoom = async (req, res) => {
  try {
    const roomToGet = await Room.findById(req.params.id);
    res.status(200).json(roomToGet);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Read all Rooms

export const getAllRooms = async (req, res) => {
  try {
    const allRooms = await Room.find();
    res.status(200).json(allRooms);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Update Room
export const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Delete Room
export const deleteRoom = async (req, res) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.id);

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id }, // deleting the room from the hotel
      });
    } catch (error) {
      console.log("Error from saving room id to the hotel", error);
      res.status(500).json(error);
    }

    res.status(200).json({ msg: "Room has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Update Room Availability
export const updateRoomAvailability = async (req, res) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );

    res.status(200).json("Updated availability dates");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
