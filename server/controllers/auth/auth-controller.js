const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/User");
const transporter = require("../../config/nodemailer.js");
const EMAIL_VERIFY_TEMPLATE = require("../../config/emailTemplates.js");
const PASSWORD_RESET_TEMPLATE = require("../../config/emailTemplates.js");

//register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  //Validation for empty fields
  if (!username || !email || !password) {
    return res.status(401).json({ success: false, message: "Missing Details" });
  }
  try {
    //checkUser_Email
    const checkUser_email = await userModel.findOne({ email });
    if (checkUser_email) {
      return res.json({
        success: false,
        message: "User already exists with the same email!",
      });
    }
    //checkUser_username
    const checkUser_username = await userModel.findOne({ username });
    if (checkUser_username) {
      return res.json({
        success: false,
        message: "User already exists with the same username!",
      });
    }

    //Hash password
    const hashpassword = await bcrypt.hash(password, 12);
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
    const newuser = new userModel({
      username,
      email,
      password: hashpassword,
      verifyOtp: otp,
      verifyOtpExpireAt: expiresAt,
    });

    const user = await newuser.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification",
      text: `Your OTP is ${otp}. Verify your account using this OTP.`,
      // html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace(
      //   "{{email}}",
      //   user.email
      // ),
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Registration successful",
      verify: true,
      email: user.email,
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
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await userModel.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });
    }

    if (!checkUser.isAccountVerified) {
      return res.json({
        success: false,
        message: "Please verify account first!",
        verify: true,
        email: checkUser.email,
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect credentials! Please try again",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "60m" }
    );
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Login Sucessful",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      message: "Something went wrong!!!",
    });
  }
};

//Verify users account using otp
const verifyAccount = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalids OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Account verified successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Resend password reset OTP

const resendResetOpt = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account activation OTP",
      // html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace(
      //   "{{email}}",
      //   user.email
      // ),
      text: `Your OTP for activating your account is ${otp}. `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "A fresh OTP has been sent to your email.",
      verify: true,
      email: user.email,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Send password reset Otp
const sendResetOpt = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Reset OTP",
      // html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace(
      //   "{{email}}",
      //   user.email
      // ),
      text: `Your OTP for reseting your password is ${otp}. use this OTP to proceed with resettin your password.`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "OTP sent on email." });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      message: "Email, OTP and new password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid otp" });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "Otp expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.json({ success: true, message: "User Password reset" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//logout
const logoutUser = async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  verifyAccount,
  resendResetOpt,
  sendResetOpt,
  resetPassword,
};
