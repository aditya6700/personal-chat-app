const Messages = require('../models/messageModel');

module.exports.addMsg = async (req, res) => {
    try {
        const { from, to, message } = req.body;
        const data = await Messages.create({
            message: { text: message },
            users: [from, to],
            sender: from
        });
        
        return res.status(201).json({ message: 'message added successfully' });
        
    }
    catch (err) {
        res.status(422).json({
            message: 'Failed to add message to the database',
            error: err.message
        });
    }
}

module.exports.getAllMsgs = async (req, res) => {
    try {
        const { from, to } = req.body;
        const data = await Messages.find({
            users: {
                $all: [from, to],
            }
        }).sort({ updatedAt: 1 });
        // console.log(data);

        const messages = data.map(msg => {
            return {
                self: msg.sender.toString() === from,
                message: msg.message.text,
                time: msg.updatedAt
            };
        });

        res.status(200).json(messages);

    }
    catch (err) {
        res.status(422).json({
            message: 'Failed to get messages',
            error: err.message
        });
    }
}