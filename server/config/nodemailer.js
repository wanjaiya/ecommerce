const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.digipadstudios.co.ke",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

module.exports = transporter;
