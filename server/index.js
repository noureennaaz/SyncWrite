const File = require("./models/Files");
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const userRoute = require('./Routes/User');
const DocRoutes = require("./Routes/Document");
const cors = require('cors');
require('dotenv').config();
require('./config/database').ConnectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/v1/doc', DocRoutes);
app.use('/api/v1/user', userRoute);

const PORT = process.env.PORT;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: `http://localhost:3000`,
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

httpServer.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    socket.emit("welcome", `Welcome to the server ${socket.id}`);
    socket.broadcast.emit("welcome", "A user entered the server " + socket.id);

    // Listen for the client to join a room based on the document ID
    socket.on('join-room', (documentId) => {
        socket.join(documentId);
        console.log(`User ${socket.id} joined room: ${documentId}`);
        
        // Notify others in the room
        io.to(documentId).emit("UserJoined", `User ${socket.id} has joined the document room ${documentId}`);
    });

    // Handle document changes
    socket.on("sending-changes", async (data) => {
        const { id, html } = data;
        console.log("Document update received:", id, "data:", html);

        try {
            await File.findByIdAndUpdate(
                id,
                { Body: html, lastUpdatedAt: new Date() },
                { new: true }
            );
        } catch (err) {
            console.error('Error updating document:', err);
        }

        // Broadcast changes only to others in the same room
        socket.to(id).emit("recieve-modified", html);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
