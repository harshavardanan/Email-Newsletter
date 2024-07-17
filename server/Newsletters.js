const db = require("./DBConnection");
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const dbQuery = "SELECT * FROM newsletters";
  db.query(dbQuery, (err, result) => {
    if (err) {
      console.error("Error retrieving newsletters:", err);
      return res
        .status(500)
        .json({ message: "Error retrieving newsletters", error: err });
    }
    return res.status(200).json(result);
  });
});

router.delete("/:id", async (req, res) => {
  const dbQuery = "DELETE FROM newsletters WHERE id=?";
  db.query(dbQuery, [req.params.id], (err, result) => {
    if (err) {
      res.json(err);
    }
    return res.json(result);
  });
});

module.exports = router;
