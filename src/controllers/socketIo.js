const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const path = require('path');
const socketPath = path.join('E:/MMDU/coding/html javascript/expressJs/public/CSS/socket.htm') ;
// console.log(socketPath);

const socket = () => {
    io.on('connection', (socket) => {
        console.log("io connected");
        socket.on('user-message', (msg) => {
            io.emit('user-message', msg);
        });
    })
}

module.exports = {socket, socketPath};

