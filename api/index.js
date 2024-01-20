const app = express();
const port = 8000;

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import crypto from "crypto";
import cors from "cors";

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import jwt from "jsonwebtoken";
import { User } from "./models/user.model.js";

// import { jwtDecode } from "jwt-decode";

mongoose
  .connect(
    "mongodb+srv://ecommerce:ecommerce@cluster0.g8qsifj.mongodb.net/ecommerce",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

// set endpoint for register user
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  console.log(name, email, password);

  if (name == "" || email == "" || password == "") {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    console.log("existingUser : ", existingUser);

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User is already registred with this email" });
    }

    const newUser = new User({
      name: name,
      email: email,
      password: password,
    });

    console.log("newUser : ", newUser);
    await newUser.save();

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log("Error creating user : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email == "" || password == "") {
    return res.status(400).json({ message: "All fields are required" });
  }

  const registredUser = await User.findOne({ email });

  console.log("registredUser : ", registredUser);

  if (!registredUser) {
    return res.status(404).json({ message: "This user is not registred" });
  }

  // compare user entered and database save password
  const isPasswordValid = await registredUser.isPasswordCorrect(password);

  console.log("isPasswordValid : ", isPasswordValid);

  if (!isPasswordValid) {
    return res.status(404).json({ message: "Pasword is incorrect" });
  }

  // generate a secret token
  const secretToken = jwt.sign({ userId: registredUser._id }, secretKey);

  res
    .status(200)
    .json({ message: "You are going to logged in", secretToken: secretToken });
});

// endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
  try {
    const { userIdFromToken, address } = req.body;

    // find the user by the userId
    const user = await User.findById(userIdFromToken);
    if (!user) {
      return res.status(404).json({ message: "User not found (from backend)" });
    }

    // add the new address to the user's addresses array
    user.address.push(address);

    // save the updated user in the backend
    await user.save();

    res.status(200).json({ message: "Address added Successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error in adding address" });
  }
});

// endpoint to get all stored addresses by user
app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // find the user by the userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.address;
    return res
      .status(200)
      .json({ message: "successfully getted all addresses", addresses });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server Error in retrieveing the addresses" });
  }
});

// endpoint to delete address
app.post("/address/remove/:addressId", async (req, res) => {
  const { userIdFromToken } = req.body;

  // Find the user by userId
  try {
    const user = await User.findById(userIdFromToken);

    if (!user) {
      return res.status(404).json({ message: "user Not found" });
    }
    const addressArray = user.address;

    // get addressId form params 
    const addressId = req.params.addressId;

    // Filter out the specified address from the addresses array
    const filteredArray = addressArray.filter(
      (item) => item._id.toString() !== addressId
    );

    // Update the user with filtered array
    user.address = filteredArray;

    // Save the user to persist the changes
    await user.save();

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    return res.status(400).json({message: "address is not being deleted"})
  }
});
