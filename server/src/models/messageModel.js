const mongoose = require('mongoose');

mongoose.pluralize(null);

const messageSchema = mongoose.Schema({
    message: {
        text: {
            type: String,
            required: true,
        }
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
    
}, { timestamps: true });

const Messages = mongoose.model("Messages", messageSchema);
module.exports = Messages;