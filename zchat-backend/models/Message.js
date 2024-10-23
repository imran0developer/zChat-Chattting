const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    content: {type: String, required: true},
    timestamp: {
        type: Date,
        default: Date.now
    },
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;