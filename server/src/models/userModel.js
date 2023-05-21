const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* By default mongoose with add 's' at the end of collection
 * to nullify that use pluralize as null */ 
mongoose.pluralize(null);

// defining schema for storing user collection
const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true,
        unique: true
    },
    cpassword: {
        type: String,
        require: true,
        unique: true
    },
    registerDate: {
        type: Date,
        default: Date.now()
    },
    lastLogin: {
        type: Date,
    },
    tokens: [{
        token: {
            type: String
        }
    }]
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            this.password = await bcrypt.hash(this.password, 12);
            this.cpassword = await bcrypt.hash(this.cpassword, 12);
        } catch (error) {
            // Handle the error appropriately
            console.error('Error occurred during password hashing:', error);
        }
    }
    next();
});

userSchema.methods.generateJsonWebToken = async function () {
    try {
        // generating a json token
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);

        // concating token with existing tokens
        this.tokens = this.tokens.concat({ token });
        await this.save();

        console.log('token generated and saved to the database');
        return token;
    }
    catch (err) {
        console.log('error in creating or saving the token : ',err.message);
    }
};

// creating a model and exporting
const Users = mongoose.model('Users', userSchema);
module.exports = Users;