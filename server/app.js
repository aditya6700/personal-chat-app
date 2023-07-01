const dotenv = require('dotenv');
const express = require('express');
const routes = require('./src/routes/routes');
const cookieParser = require('cookie-parser');
const socket = require('socket.io');

dotenv.config({ path: './config.env' }); // configuring env file
require('./src/db/conn'); // connecting to the database

// setting up express and port
const app = express();
const PORT = 1432 || process.env.PORT;

// parsing incoming requesting into json
app.use(express.json());

// to parse incoming cookie
app.use(cookieParser());

// home page
app.get('/', (req, res) => {
    res.status(200).send('home page');
});

app.use('/api', routes);


// undefined routes for get and post
app.get('*', (req, res) => {
    res.status(404).send('undefined get request');
});
app.post('*', (req, res) => {
    res.status(404).send('undefined post request');
});


// setting up server to listen on a port
const server = app.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}`);
});

// setting up socket to listen to client
const io = socket(server, {
    cors: {
        origin: "http://localhost:3000/",
        credentials: true
    },
    path: '/socket.io'
});

// creating a global map to store online users
global.onlineUsers = new Map();


// socket to listen connection
io.on('connection', (socket) => {
    // store the current socket to chatsocket
    global.chatSocket = socket;

    // on add-user even is emitted from client
    // store the current userid and the socket id in the map
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    // on send-msg event from client
    socket.on('send-msg', (data) => {
        // fetch the socketid of the user who sent the msg
        const sendUserSocket = onlineUsers.get(data.to);

        // if the user is online emit the msg-recieved
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-recieve', {
                message: data.message,
                time: data.time
            });
        };
    });
});
