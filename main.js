const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const cors = require('cors');
const config = JSON.parse(fs.readFileSync("./config/config.json").toString());

const app = express();
app.use(cors());

const PORT = config.port;
const functions = require("./structs/functions.js");
const log = require("./structs/log.js");

let server;

mongoose.set('strictQuery', true);

mongoose.connect(config.mongodb.database)
    .then(() => {
        log.backend("App successfully connected to MongoDB!");
    })
    .catch(err => {
        log.error("MongoDB failed to connect, please make sure you have MongoDB installed and running.");
        throw err;
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Pas besoin pour le moment
// fs.readdirSync("./routes").forEach(fileName => {
//     try {
//         app.use(require(`./routes/${fileName}`));
//     } catch (err) {
//         log.error(`Routes Error: Failed to load ${fileName}`)
//     }
// });

fs.readdirSync("./Api").forEach(fileName => {
    try {
        app.use(require(`./Api/${fileName}`));
    } catch (err) {
        log.error(`API Error: Failed to load ${fileName}`)
    }
});

server = app.listen(PORT, () => {
    log.backend(`Backend started listening on port ${PORT}`);
    }).on("error", async (err) => {
    if (err.code === "EADDRINUSE") {
        log.error(`Port ${PORT} is already in use!\nClosing in 3 seconds...`);
        await functions.sleep(3000);
        process.exit(0);
    } else {
        throw err;
    }
});


// redirection
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/website.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dashboard.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/register.html'));
});

module.exports = app;
