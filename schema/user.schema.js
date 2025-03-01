const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true }, //String,
    email: { type: String, required: true, unique: true }, //String,
    password: { type: String, required: true }, //String,
    phone: { type: String, required: true, unique: true }, //String,
    
    createdAt: { type: Date, default: Date.now },
    
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
