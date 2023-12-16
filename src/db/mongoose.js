const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

mongoose.connection.once("open", () => {
  console.log("Connected to db");
});

module.exports = mongoose;
