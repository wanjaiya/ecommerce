const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //Hash password
    const hashpassword = await bcrypt.hash(password, 12);
    const newuser = new User({
      username,
      email,
      password: hashpassword,
    });

    await newuser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      message: "Something went wrong!!!",
    });
  }
};

//login
const login = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      message: "Something went wrong!!!",
    });
  }
};

//logout

//auth middleware

module.exports = {
  registerUser,
};
