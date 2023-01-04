const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel")


exports.register = asyncHandler(async (req, res) => {
  const { name, email, password ,pic} = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await userModel.create({
    name,
    email,
    password,
    pic,
  })
  
  if (user) {
    res.status(201).json({
        user,
        token: generateToken(user._id), 
    })
  }

});
