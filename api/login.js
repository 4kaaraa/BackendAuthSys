const express = require("express");
const app = express.Router();
const User = require("../model/user.js");

app.get("/api/information/user/login", async (req, res) => {
    const { username, password } = req.query;

    if (!username) return res.status(400).json({response: "Invalide Requests"});
    if (!password) return res.status(400).json({response: "Invalide Requests"});

    try {
        const user = await User.findOne({ username: username });
        if (!user) return res.status(404).json({response: "User Not Fund"});
        
        if (user.password == password) {
            const username = user.username;

            return res.status(200).json({
                username: username,
            });
        } else {
            return res.status(400).json({response: "Error"});
        }


    } catch (err) {
        console.error('License Api Error:', err);
        return res.status(500).json({response: "Error encountered, look at the console"});
    }
});

app.get("/api/information/user/all", async (req, res) => {
    try {
        const user = await User.find();
        return res.status(200).json(user);
    } catch (err) {
        console.error('License API Error (get all):', err);
        return res.status(500).json({ response: "Error encountered, check the console" });
    }
});

module.exports = app;
