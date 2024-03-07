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

    io.of(namespace.endpoint).on('connection', (nsSocket)=>{

        nsSocket.emit('roomLoad', namespace.rooms);

        nsSocket.on('joinRoom', (roomName)=>{

            let lastRoomName = Array.from(nsSocket.rooms)[1];
            nsSocket.leave(lastRoomName);
            updateOnlineUsers(namespace.endpoint, lastRoomName);

            nsSocket.join(roomName);
            updateOnlineUsers(namespace.endpoint, roomName);

            let roomInfo = namespace.rooms.find((room)=>{ return room.name === roomName });
            nsSocket.emit('roomInformation', roomInfo);

        })

    })

})


async function updateOnlineUsers(endpoint, roomName){
    let onlineUsers = await io.of(endpoint).in(roomName).allSockets()
    io.of(endpoint).in(roomName).emit('updateOnlineUsers', Array.from(onlineUsers).length);
}