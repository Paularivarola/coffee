const mongoose = require("mongoose");
const informationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  src: { type: String, required: true },
  text1: { type: String, required: true },
  text2: { type: String, required: true },
  text3: { type: String, required: true },
 
});
const Information = mongoose.model("information", informationSchema);
module.exports = Information;