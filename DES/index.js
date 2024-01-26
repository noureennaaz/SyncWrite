const cookieParser = require('cookie-parser');
const express = require('express');
const app = express()
const http=require('http')
const {Server} = require("socket.io");
const { createServer } = require("http");
const userRoute= require('./Routes/User')
const cors =require('cors')
require('dotenv').config()
// require('./config/database').ConnectDB();


app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api/v1/', userRoute)


const PORT=process.env.PORT


const httpServer = http.createServer(app)

const io = new Server(httpServer,{
    cors:{
        origin:`http://localhost:3000`,
        methods: ['GET', 'POST']
    }
});


httpServer.listen(PORT, ()=>{
    console.log(`App runnung in port ${PORT}`)
})


app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
  });

io.on('connection', (socket) => {
    socket.broadcast.emit("recieve-changes", {message :"user connected"});
    
    socket.on("sending-changes", (html)=> 
    {
    
      socket.broadcast.emit("recieve-modified", html)
      })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


