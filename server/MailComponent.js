const nodemailer = require("nodemailer");
require("dotenv").config();
const { red, bold } = require("consoleartist");

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log(red(bold("Server is ready to take our messages")));
  }
});

module.exports = { transporter };
