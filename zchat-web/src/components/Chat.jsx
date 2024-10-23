
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../constants';


const socket = io.connect(baseUrl); // Connect to backend



const Chat = () => {

    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [chatUser, setChatUser] = useState(null);
    


    const token = localStorage.getItem('token');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {

        if (!token) {
            navigate('/login');
        }

    }, [token, navigate])

    const fetchMessages = async () => {
        try {
            // Fetch initial chat messages from the API
            const sender= localStorage.getItem('userid');
            const receiver= chatUser._id;
            const res = await axios.get(`${baseUrl}/api/chat/messages?senderId=${sender}&receiverId=${receiver}`, config);
            setMessages(res.data);  // Set the fetched messages in state

        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized. Redirecting to login.');
                navigate('/login');  // Redirect to login if token is invalid or expired
            } else {
                console.error('Error fetching messages:', error);
            }
        }
    };


    // Fetch messages and setup Socket.IO
    useEffect(() => {
        
        const fetchUsers = async () => {
            try {
                // Fetch initial chat messages from the API
                const res = await axios.get(`${baseUrl}/api/users`, config);
                setUsers(res.data);

            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized. Redirecting to login.');
                    navigate('/login');  // Redirect to login if token is invalid or expired
                } else {
                    console.error('Error fetching messages:', error);
                }
            }
        };
        
        if (chatUser != null){
            fetchMessages();
        }

        fetchUsers();
        

        // Listen for new messages
        socket.on('receiveMessage', (message) => {
            console.log("Received Message: ", message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Cleanup on component unmount
        return () => {
            socket.off('receiveMessage');
        };
    }, [token, navigate, baseUrl, chatUser]);

    useEffect(() => {
        if (chatUser != null){
            fetchMessages()
        }
    
    }, [messages])
    


    const sendMessage = () => {
        if (newMessage.trim() !== "") {
            const messageData = {
                sender: localStorage.getItem('userid'),
                content: newMessage,
                receiver: chatUser._id
            };

            console.log("Sending message:", messageData);
            if (socket.connected) {  // Check if the socket is connected
                socket.emit('sendMessage', messageData);
                console.log("Message emitted successfully");
            } else {
                console.log("Socket not connected, unable to send message");
            }

            setNewMessage("");
        } else {
            console.log('Message is empty');
        }
    };

    const chatClicked = (user) => {
        console.log("User: ",user);

        setChatUser(user);
        
    }

    return (
        <div className='chat-app'>
        <div className='users-list'>
            <h3>Users</h3>
            {users.map((user, index) => (
                <div key={index} className={`user-item ${chatUser === user ? 'active' : ''}`} onClick={() => chatClicked(user)}>
                    <strong>{user.username}</strong>
                </div>
            ))}
        </div>
        <div className='chat-section'>
            {chatUser ? (
                <div className='chat-window'>
                    <h3 className='chat-username'>{chatUser.username} == {localStorage.getItem('username')}</h3>
                    <div className='messages'>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${msg.sender._id === localStorage.getItem('userid') ? 'received' : 'sent'}`}
                            >
                                <span className='message-content'>{msg.content}</span>
                                <span className='message-sender'>{msg.sender.username}</span>
                            </div>
                        ))}
                    </div>
                    <div className='input-area'>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message"
                            className='message-input'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    sendMessage();
                                }
                            }}
                        />
                        <button onClick={sendMessage} className='send-btn'>Send</button>
                    </div>
                </div>
            ) : (
                <div className='chat-placeholder'>
                    <h2>Select a user to start chatting</h2>
                </div>
            )}
        </div>
    </div>
    );
};

export default Chat;
