const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const { type } = require('os');
const protect = require('./middleware/auth');
const Message = require('./models/Message');

// load the env variables
dotenv.config()

const app = express();
const server = http.createServer(app);

const socketIO = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


app.use(cors());
app.use(express.json());



const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const chatRoutes = require('./routes/chat')

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);


// protect chats with middleware
app.use('/api/chat', protect);
app.use('/api/users', protect);

const mongoDBUrl = process.env.MONGODB_URI;
console.log("MongoDBUrl", mongoDBUrl);
mongoose.connect(mongoDBUrl).then(()=>{
    console.log("MongoDB connected successfully!");
}).catch(error=>{
    console.error("MongoDB connection error: ", error);
});


socketIO.on('connection', (socket) => {
    console.log("New user connected");

    socket.on('sendMessage', async (data) => {
        console.log('sendMessage', data);
        try {
            const newMessage = new Message(data);
            console.log("newMessage:",newMessage);
            await newMessage.save();

            socketIO.emit('receiveMessage', newMessage)
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });


    socket.on('disconnect', ()=>{
        console.log("User disconnected");
    });

});





























// start the socket server
const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>{
    console.log(`Socket Server running on port ${PORT}`);
})