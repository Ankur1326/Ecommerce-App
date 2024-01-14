const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
const User = require("./models/user.model");
const { error } = require("console");

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



app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  console.log(name, email, password);

  if (name == "" || email == "" || password == "") {
    return res.status(400).json({message: "All fields are required"});
  }

  try {
    const existingUser = await User.findOne({ email });
  
    console.log("existingUser : ", existingUser);
  
    if (existingUser) {
      return res.status(409).json({message: "User is already registred with this email"})
    }
  
    const newUser = new User({
      name: name,
      email: email,
      password: password,
    })
  
    console.log("newUser : ", newUser);
    await newUser.save()
  
    res.status(200).json({message : "User created successfully"})
  
  } catch (error) {
    console.log("Error creating user : ", error);
    res.status(500).json({error: "Internal Server Error"})
  }
});
