const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        username_lower: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        keys: { type: String, required: true },
        discordId: { type: String, required: false, unique: true },
        created: { type: Date, required: true }
    },
    {
        collection: "users"
    }
)

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model;