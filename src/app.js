const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const router = require('./Routes/route')
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const {schema,connection} = require('./models/mongo');
const {socket, socketPath} = require('./controllers/socketIo')
connection("mongodb://localhost/Vishnu")

const staticpath = path.join(__dirname, "../ public");
// console.log(staticpath);

// To use static html page
app.use(express.static(staticpath));
app.use(express.urlencoded());


// To use dynamic html page
const viewPath = path.join(__dirname, '../views');
// console.log(viewPath);

app.set('view engine', 'pug');
app.set('views', viewPath);

app.use('/', router);
app.use('/home', router);
app.use('/login', router);
app.use('/contact', router);
app.use('/socket', router);

io.on('connection', (socket) => {
    console.log("io connected");
    socket.on('user-message', (msg) => {
        io.emit('user-message', msg);
    });
})
server.listen(8000, () => {
    console.log("This is a chat application");
});
