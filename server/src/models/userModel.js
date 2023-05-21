const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    }
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

// creating a model and exporting
const Users = mongoose.model('Users', userSchema);
module.exports = Users;