import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register User
export const registerUser = async (req, res) => {
  console.log;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      userName: req.body.username,
      email: req.body.email,
      country: req.body.country,
      city: req.body.city,
      phone: req.body.phone,
      img: req.body.img,
      password: hash,
    });

    //Existing user validation
    const existingUser = await User.findOne({ userName: req.body.username });
    if (existingUser) {
      return res.status(400).send({
        msg: "User already exists. Please login instead!",
        ...req.body,
      });
    }

    await newUser.save();
    const { password, isAdmin, ...otherDetails } = newUser._doc;
    res.status(200).json({ details: { ...otherDetails }, isAdmin });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Login User
export const login = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ userName: req.body.username });
    console.log(user);

    //Validation: if user exists
    if (!user) {
      return res.status(404).send("User not found!");
    }

    //Validation: is password
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).send("Wrong Password!");
    }

    //JWT
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    //destructing user doc to send only required info
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      }) //sending the jwt token as cookie with key-access_token, setting configuration to httpOnly which doesnt allow the client to use this cookie
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin }); //what is the difference between res.status(200).json({...otherDetails});
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
