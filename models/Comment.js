const mongoose = require("mongoose") 

const commentSchema = new mongoose.Schema({
    comment: {type: String},
    userId: {type: mongoose.Types.ObjectId, ref: "user"},
    name: {type: String},
    lastname:{type: String},
    image:{type: String},
})

const Comment = mongoose.model("comment", commentSchema)
module.exports = Comment