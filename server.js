const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const router = require("./routes/index");
const path = require("path");

require("dotenv").config();
const app = express();
const PORT = 3001;

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);

mongoose.connect(process.env.MONGODB_URI || PORT, {
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
  console.log("Connected to the Database...");
});
mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection Error : " + err);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 3001, function () {
  console.log(`Server listening on port ${PORT}.`);
});
