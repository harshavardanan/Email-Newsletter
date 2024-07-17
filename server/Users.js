const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const db = require("./DBConnection");
const { v4: uuidv4 } = require("uuid");

router.get("/", async (req, res) => {
  const dbQuery = "SELECT * FROM users";
  db.query(dbQuery, (err, result) => {
    if (err) return res.json({ Message: err });
    return res.json(result);
  });
});

router.post("/", (req, res) => {
  const { name, email } = req.body;
  const dbQuery = "INSERT INTO users VALUES (?, ?, ?)";
  db.query(dbQuery, [uuidv4(), name, email], (err, result) => {
    if (err) {
      res.json({ Message: err });
    }
    return res.json(result);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const dbQuery = "SELECT * FROM users WHERE id=?";
  db.query(dbQuery, [id], (err, result) => {
    if (err) {
      res.json({ Message: err });
    }
    return res.json(result);
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const dbQuery = "DELETE FROM users WHERE id=?";
  db.query(dbQuery, [id], (err, result) => {
    if (err) {
      res.json({ Message: err });
    }
    return res.json(result);
  });
});
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const dbQuery = "UPDATE users SET name=?, email=? WHERE id=?";
  db.query(dbQuery, [name, email, id], (err, result) => {
    if (err) {
      res.json({ Message: err });
    }
    return res.json(result);
  });
});

module.exports = router;
