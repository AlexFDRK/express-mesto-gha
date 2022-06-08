const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mydb");

app.use((req, _res, next) => {
  req.user = {
    _id: "629f8a611b254de354e42d835",
  };

  next();
});

app.use("/users", require("./routers/users"));
app.use("/cards", require("./routers/cards"));

app.listen(PORT, () => {
  console.log("Listeninng port 3000");
});
