# ZChat - Real-Time Chat Application



https://github.com/user-attachments/assets/9b9ba55a-8fc7-4932-a809-5977734c53aa


ZChat is a modern, real-time chat application built using the MERN stack (MongoDB, Express, React, and Node.js) with Socket.IO for real-time messaging. The application supports user authentication, private messaging, and displays users in real-time with a clean and modern UI.

## Tech Stack

### Frontend:
- **React**: A JavaScript library for building user interfaces.
- **Axios**: For making HTTP requests from React to the backend.
- **Socket.IO (Client)**: For real-time, bi-directional communication between the client and the server.
- **CSS**: Custom styling for a modern and clean user interface.

### Backend:
- **Node.js**: A JavaScript runtime for running the server.
- **Express**: A fast, minimalistic web framework for Node.js.
- **MongoDB**: A NoSQL database for storing users, messages, and chat data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Socket.IO (Server)**: For enabling real-time communication between the backend and connected clients.
- **JWT (JSON Web Token)**: For user authentication and authorization.
- **Bcrypt.js**: For securely hashing user passwords.

## Features

- **User Authentication**: Users can register, login, and access chat functionality using JWT-based authentication.
- **Real-time Messaging**: Messages are delivered instantly between users using Socket.IO for real-time communication.
- **User Listing**: A list of available users is displayed on the sidebar. Click a user to start chatting.
- **Private Chat**: Users can chat privately with one another, and the conversation between two users is stored and displayed.
