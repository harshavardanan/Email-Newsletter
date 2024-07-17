const axios = require("axios");
const express = require("express");
const router = express.Router();
const { transporter } = require("./MailComponent");
const db = require("./DBConnection");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const PORT = process.env.PORT;

const fetchUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:${PORT}/user`);
    const userEmails = response.data.map((user) => user.email); // Ensure this matches your data structure
    return userEmails;
  } catch (error) {
    console.error("Error fetching user emails:", error);
    return [];
  }
};

router.post("/send-newsletter", async (req, res) => {
  try {
    const userEmails = await fetchUsers();
    const { subject, body } = req.body;

    if (userEmails.length === 0) {
      console.log("No user emails found or error fetching emails");
      return;
    }

    const dbquery =
      "INSERT INTO newsletters (id, subject, body) VALUES (?, ?, ?)";
    db.query(dbquery, [uuidv4(), subject, body], (err, result) => {
      if (err) {
        console.error("Error inserting into newsletters table:", err);
        return res.status(500).json({
          message: "Error inserting into newsletters table",
          error: err,
        });
      }
      console.log("Newsletter inserted successfully");
      return res
        .status(200)
        .json({ message: "Newsletter sent and inserted successfully", result });
    });

    const mailContent = {
      from: "Harshavardanan",
      to: userEmails,
      subject: subject,
      html: body,
    };

    transporter.sendMail(mailContent, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent successfully", info);
      }
    });
  } catch (error) {
    console.error("Error in sending mails:", error);
  }
});

module.exports = router;
