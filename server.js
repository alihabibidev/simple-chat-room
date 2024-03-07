const express = require('express');
const socketIo = require('socket.io');
const structure = require('./structure');

const app = express();

app.use(express.static(__dirname + '/public'));

const httpServer = app.listen(3000);
const io = socketIo(httpServer, {
    cors : {
        origin : '*'
    }
});