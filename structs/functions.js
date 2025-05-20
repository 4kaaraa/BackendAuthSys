const fs = require("fs");
const path = require("path");

const User = require("../model/user.js");
const Key = require("../model/keys.js");


async function registerUser(username, password, keys) {
    
    if (!username || !password || !keys) {
        return { message: "Username, email, or password is required.", status: 400 };
    }

    if (await User.findOne({ username })) {
        return { message: "You already created an account!", status: 400 };
    }

    if (username.length >= 25) {
        return { message: "Your username must be less than 25 characters long.", status: 400 };
    }
    if (username.length < 3) {
        return { message: "Your username must be at least 3 characters long.", status: 400 };
    }
    if (password.length >= 128) {
        return { message: "Your password must be less than 128 characters long.", status: 400 };
    }
    if (password.length < 4) {
        return { message: "Your password must be at least 4 characters long.", status: 400 };
    }

    const allowedCharacters = (" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~").split("");
    
    for (let character of username) {
        if (!allowedCharacters.includes(character)) {
            return { message: "Your username has special characters, please remove them and try again.", status: 400 };
        }
    }

    try {
        await User.create({ username, username_lower: username.toLowerCase(), password, keys, created: new Date().toISOString()}).then(async (i) => {   
        });
    } catch (err) {
        if (err.code == 11000) {
            return { message: `Username or email is already in use.`, status: 400 };
        }

        return { message: "An unknown error has occurred, please try again later.", status: 400 };
    }

    return { message: `Successfully created an account with the username ${username}`, status: 200 };
}

async function deleteUserByUsername(username) {
    if (!username) {
        return { message: "Username is required.", status: 400 };
    }

    const result = await User.deleteOne({ username_lower: username.toLowerCase() });

    if (result.deletedCount === 0) {
        return { message: `No user found with username '${username}'.`, status: 404 };
    }

    return { message: `User '${username}' deleted successfully.`, status: 200 };
}

async function generateKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    function generatePart(length) {
        let part = '';
        for (let i = 0; i < length; i++) {
            part += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return part;
    }

    let key;
    let exists = true;

    while (exists) {
        key = `BLUE-${generatePart(4)}-${generatePart(4)}-${generatePart(4)}`;

        const result = await Key.exists({ keys: key });

        exists = result !== null;
    }

    return key;
}

async function insertKey(keys) {
    const take = false;
    const hwid = "Aucun";
    const valid = true;

    const created = new Date();
    const expired = new Date();
    expired.setFullYear(2300);

    try {
        await Key.create({
            keys,
            take,
            hwid,
            created: created.toISOString(),
            expired: expired.toISOString(),
            valid
        });
    } catch (err) {
        if (err.code == 11000) {
            return { message: `Key already exists.`, status: 400 };
        }

        return { message: "An unknown error has occurred, please try again later.", status: 400 };
    }

    return { message: `Key ${keys} created successfully.`, status: 200 };
}


module.exports = {
    registerUser,
    deleteUserByUsername,
    generateKey,
    insertKey
}