const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  verifyAccount,
  resendResetOpt,
  sendResetOpt,
  resetPassword,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/verify-account", verifyAccount);
router.post("/resend-reset-otp", resendResetOpt);

router.post("/send-reset-otp", sendResetOpt);
router.post("/reset-password", resetPassword);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated User",
    user,
  });
});

module.exports = router;
