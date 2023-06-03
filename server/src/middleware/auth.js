const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');

const authenticate = async (req,res,next) => {
    try {
        
        // console.log('authenticating')
        // token is stored in request and 'el_token' is the token name which we set
        const token = req.cookies.el_token;
        
        // verifying the token using the secret key
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        
        // verifing user with the token saved in cookie with our secret key
        const user = await Users.findOne({ _id: verifyUser._id, "tokens.token": token });

        if (!user) {
            throw new Error("User not authenticated");
        }

        res.token = token;
        res.userId = user._id;
        res.user = user;

        next();

    }
    catch (err) {
        // console.log(err);
        console.log('user not found');
        res.status(401).json({
            message: "UnAuthorized user",
            error: err.message,
            status: false
        });
    }
}

module.exports = authenticate;