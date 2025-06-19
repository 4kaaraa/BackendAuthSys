const express = require("express");
const app = express.Router();
const Key = require("../model/keys.js");
const log = require("../structs/log.js");
const functions = require("../structs/functions.js");

app.get("/api/information/key/check", async (req, res) => {
    const { keys } = req.query;

    if (!keys) return res.status(400).json({ response: "Invalid Request" });

    try {
        const key = await Key.findOne({ keys: keys });
        if (!key) return res.status(404).json({ response: "Key Not Found" });

        if (key.valid === true) {
            return res.status(200).json({
                keys: key.keys,
                take: key.take,
                hwid: key.hwid,
                created: key.created,
                expired: key.expired,
                valid: key.valid,
            });
        } else {
            return res.status(403).json({
                response: "Key is not valid",
                valid: key.valid,
            });
        }
    } catch (err) {
        console.error('License API Error:', err);
        return res.status(500).json({ response: "Error encountered, check the console" });
    }
});

app.get("/api/information/key/create", async (req, res) => {
    const { type } = req.query;

    if (!type) return res.status(400).json({ reponse: "Invalid Request"});

    try {
        const generateKey = await functions.generateKey();

        await functions.insertKey(generateKey, type)
        log.api(`New keys / ${generateKey} | Duration / ${type}`);

        return res.status(500).json({
            keys: generateKey
        });

    } catch (err) {
        console.error('License Api Error:', err);
        return res.status(500).json({response: "Error encountered, look at the console"});
    }
});

app.get("/api/information/key/all", async (req, res) => {
    try {
        const keys = await Key.find();
        return res.status(200).json(keys);
    } catch (err) {
        console.error('License API Error (get all):', err);
        return res.status(500).json({ response: "Error encountered, check the console" });
    }
});

app.get("/api/information/key/edit", async (req, res) => {
    const { keys, type, take, hwid, valid } = req.query;

    if (!keys) return res.status(400).json({ response: "Key is required" });

    try {
        const key = await Key.findOne({ keys: keys });
        if (!key) return res.status(404).json({ response: "Key not found" });

        // Mise à jour des champs si présents dans la requête
        if (type !== undefined) key.type = type;
        if (take !== undefined) key.take = take === "true";
        if (hwid !== undefined) key.hwid = hwid;
        if (valid !== undefined) key.valid = valid === "false";

        await key.save();

        return res.status(200).json({ response: "Key updated successfully", key });

    } catch (err) {
        console.error("License API Error (edit key):", err);
        return res.status(500).json({ response: "Internal server error" });
    }
});

module.exports = app;
