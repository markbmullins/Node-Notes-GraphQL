const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Note = new Schema({
    title: String,
    content: String,
    order: Number
});

module.exports = mongoose.model("Note", Note);
