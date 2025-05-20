const express = require("express");
const app = express.Router();

const softwareVersion = "1.0";
const softwareMaintenance = false;
const softwareUpdate = false;
const webAvailable = true;
const dashboardAvailable = true;
const apiAvailable = true;

app.get("/api/information/status", (req, res) => {
    res.status(200).json({
        version: softwareVersion,
        maintenance: softwareMaintenance,
        update: softwareUpdate,
        website: webAvailable,
        dashboard: dashboardAvailable,
        api: apiAvailable
    });
});

module.exports = app;