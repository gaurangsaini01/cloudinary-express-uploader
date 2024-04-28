const mongoose = require("mongoose");
require("dotenv").config();
function connectWithDb() {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("DB Connection Success"))
    .catch((err) => {
      console.log(err);
    });
}
module.exports = connectWithDb;
