const Users = require('../models/userModel');
const bcrypt = require('bcryptjs');

module.exports.register = async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body;

    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ message: "Every field must be filled" });
    }
    else if (password !== cpassword) {
        return res.status(422).json({ message: "password and confirm password must be same" });
    }

    try {
        // Find a user by email if exists throw error
        const duplicateUser = await Users.findOne({ email });
        if (duplicateUser) {
            return res.status(406).json({ message: 'A user already exists with same email', error: duplicateUser });
        }

        const user = new Users({ name, email, phone, password, cpassword });
        const userRes = await user.save();

        res.status(201).json({ message: 'User registered', data: userRes });
    }
    catch (err) {
        if (err.name === "MongoError" || err.name === "MongoServerError") {
            // MongoDB-related error
            console.log("MongoDB Error:", err.message);
            res.status(422).json({
                message: 'Error occured while registering',
                error: err.message
            });
        } else {
            // Other types of errors
            console.log("Generic Error:", err);
            res.status(422).json({
                message: 'unknown error',
                error: err
            });
        }
    }
};

module.exports.login = async (req,res) => {
    const { email, password } = req.body;

    if (!email || !password ) {
        return res.status(422).json({ message: "Enter both email and password." });
    }

    try {
        const loginUser = await Users.findOne({ email });
        if (loginUser) {
            const hashOk = await bcrypt.compare(password, loginUser.password);

            if (!hashOk) {
                return res.status(401).json({ message: "Invalid Credentials." });
            }

            const token = await loginUser.generateJsonWebToken();

            const twelveHours = 12 * 60 * 60 * 1000; // Convert 12 hours to milliseconds
            const expirationDate = new Date(Date.now() + twelveHours);

            res.cookie('el_token', token, {
                expires: expirationDate,
                httpOnly: true
            });

            res.status(200).json({ message: "Login success" });

        }
        else {
            return res.status(401).json({ message: "Invalid Credentials." });
        }

    }
    catch (err) {
        res.status(422).json({
            message: 'unknown error',
            error: err
        });
    }
}