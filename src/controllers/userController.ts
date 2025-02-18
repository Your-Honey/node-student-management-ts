import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import generateToken from "../utils/genrateToken";



const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the feilds");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password),
  });
  if (user) {
    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(String(user._id)),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(String(user._id)),
      });
    }
  } else {
    res.status(400);
    throw new Error("Wrong email or password");
  }
});



export { registerUser, authUser };