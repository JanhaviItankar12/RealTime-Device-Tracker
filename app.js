const express = require('express');
const socketio = require('socket.io');
const path = require('path');

const http = require('http');
const app=express();
const server=http.createServer(app);
const io=socketio(server);

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

io.on("connection",(socket)=>{
    socket.on("Send-Location",(data)=>{
      io.emit("received-Location",{id:socket.id,...data});  
    });
    
    socket.on("disconnect",()=>{
        io.emit("User-disconnected",socket.id);
    })
     console.log("connected");
})

server.listen(8080,()=>{
    console.log("app is listening");
})

app.get("/",(req,res)=>{
    res.render("index.ejs");
})