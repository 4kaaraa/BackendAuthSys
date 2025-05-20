const express = require("express");
const app = express.Router();
const log = require("../structs/log.js");
const functions = require("../structs/functions.js");
const Key = require("../model/keys.js");

//Api for launcher login (If u want a POST requesto just replace "app.get" to "app.post" and "req.query" to "req.body")
app.get("/api/information/user/register", async (req, res) => {
    const { username, password, keys } = req.query;

    if (!username) return res.status(400).send('Invalide Format.');
    if (!password) return res.status(400).send('Invalide Format.');
    if (!keys) return res.status(400).send('Invalide Format.');

    const key = await Key.findOne({ keys: keys });
    if (!key) return res.status(404).json({response: "Key Not Fund"});

    try {
        if (!key.valid){
            return res.status(404).json({response: "Key Expired"});
        }

        await functions.registerUser(username, password, keys);
        log.api(`${username} successfully created an account.`);

        return res.status(200).json({
            response: "Accounts created",
        });

    } catch (err) {
        console.error('Register Api Error:', err);
        return res.status(500).send('Error encountered, look at the console');
    }
});

app.get("/api/information/user/delete-user", async (req, res) => {
    const { username } = req.query;

    if (!username) return res.status(400).send('Invalide Format.');

    const result = await functions.deleteUserByUsername(username);
    res.status(result.status).json({ message: result.message });
});

module.exports = app;