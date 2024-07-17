const express = require("express");
const app = express();
const { cyan, underline } = require("consoleartist");
const cors = require("cors");
require("dotenv").config();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: "50mb" })); // Adjust the limit as necessary
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const db = require("./DBConnection");

app.use("/user", require("./Users"));
app.use("/", require("./EmailContent"));
app.use("/sent-newsletters", require("./Newsletters"));

app.listen(process.env.PORT, () =>
  console.log(cyan(underline(`Server running on PORT:${process.env.PORT}`)))
);
