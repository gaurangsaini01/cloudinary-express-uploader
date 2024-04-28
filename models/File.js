const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: String,
  tags: String,
  email: String,
});

module.exports = mongoose.model("File", fileSchema);
