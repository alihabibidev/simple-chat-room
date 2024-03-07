const express = require('express');
const socketIo = require('socket.io');
const structure = require('./structure');

const app = express();

app.use(express.static(__dirname + '/public'));

const httpServer = app.listen(3000,()=>{
    console.log("serverrrrrrrrrrr ok");
});
const io = socketIo(httpServer, {
    cors : {
        origin : '*'
    }
});


// io.of('/').on('connection', (socket)=>{
//     let nsData = structure.map((namespace)=>{
//         return {
//             title : namespace.title,
//             endpoint : namespace.endpoint
//         }
//     });

//     socket.emit('namespaceLoad', nsData);
// });

io.on('connection', (socket)=>{
    let nsData = structure.map((namespace)=>{
        return {
            title : namespace.title,
            endpoint : namespace.endpoint
        }
    });

    socket.emit('namespaceLoad', nsData);
});

structure.forEach((namespace)=>{

    io.of(namespace.endpoint).on('connection', (socket)=>{

        socket.emit('roomLoad', namespace.rooms);

    })

})