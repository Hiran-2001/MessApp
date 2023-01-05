const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel")
const generateToken = require("../config/generateToken")

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400);
    res.send("User already exists");
  }

  const user = await userModel.create({
    name,
    email,
    password,
    pic,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      emamil: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    })
  }

});


exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.send("please fill the fields")
  }

  const user = await userModel.findOne({ email });


  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      status:201,
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    }
    )
  }
  else{
    const err = "invalid Details"
    res.status(401).json({status:401,err})
  }

})