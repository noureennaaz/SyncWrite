const cookieParser = require('cookie-parser');
const express = require('express');
const app = express()
const http=require('http')
const {Server} = require("socket.io");
const { createServer } = require("http");
const userRoute= require('./Routes/User')
const DocRoutes = require("./Routes/Document")
const cors =require('cors')
require('dotenv').config()
require('./config/database').ConnectDB();


app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api/v1/doc', DocRoutes)
app.use('/api/v1/user', userRoute)


const PORT=process.env.PORT


const httpServer = http.createServer(app)

const io = new Server(httpServer,{
    cors:{
        origin:`*`,
        methods: ['GET', 'POST'],
        credentials:true
    }
});


httpServer.listen(PORT, ()=>{
    console.log(`App runnung in port ${PORT}`)
})


app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
  });

io.on('connection', (socket) => {

    socket.emit("welcome", `Welcome to the server ${socket.id}` )
    socket.broadcast.emit("welcome", "A user entered the server " + socket.id)
    // socket.broadcast.emit("recieve-changes", "user connected");
    

    socket.join("user1")
    io.sockets.in("user1").emit("UserJoined", "A new user enterred the room"+"user1");
    socket.on("sending-changes", (html)=> 
    {
    
      socket.broadcast.emit("recieve-modified", html)
      })

    socket.on('disconnect', () => {
        console.log('user disconnected :', socket.id);
    });
});


