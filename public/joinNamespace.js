function joinNamespace(endpoint){
    if(nsSocket){
        nsSocket.close();
    }
    nsSocket = io(`http://localhost:3000${endpoint}`);

}