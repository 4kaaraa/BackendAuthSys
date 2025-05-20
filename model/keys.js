const mongoose = require("mongoose");

const KeySchema = new mongoose.Schema(
    {
        keys: { type: String, required: true, unique: true },
        take: { type: Boolean, required: true },
        hwid: { type: String, required: true },
        created: { type: Date, required: true },
        expired: { type: Date, required: true },
        valid: { type: Boolean, required: true }
    },
    {
        collection: "keys"
    }
)

const model = mongoose.model('KeySchema', KeySchema);

module.exports = model;

//BLUE-K2F9-ZX3L-M1Q8