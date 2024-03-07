function joinRoom(roomName){

    nsSocket.emit('joinRoom', roomName);

    nsSocket.off('roomInformation');
    nsSocket.off('updateOnlineUsers');
    
    nsSocket.on('roomInformation', (roomInfo)=>{
        $('.roomName').html(roomInfo.title);
    })
    nsSocket.on('updateOnlineUsers', (count)=>{
        $('.onlineCount').html(count);
    })

}