const express = require('express');
const Message = require('../models/Message');


const router = express.Router();

router.get('/messages', async(req, res)=>{
    console.log("Messages routes");

    const { senderId, receiverId} = req.query;

    console.log(`senderID ${senderId}, receiverId ${receiverId}`);

    
    try{
        const messages = await Message.find({
            $or: [
                {sender: senderId, receiver: receiverId},
                {sender: receiverId, receiver: senderId}
            ]
        })
        .populate('sender', 'username')
        .populate('receiver', 'username')
        .sort({ timestamp: 1 });

        console.log("Received Messages: ",messages);

        res.json(messages);
    } catch (error){
        console.log("Error fetching messages \n: ",error);
        res.status(400).json({error: "Error fetching messages"})
    }
})


module.exports = router;