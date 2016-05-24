//Our sockets module.  This is where NodeJS really shines.  Sockets allow for bilateral communication
//between the server and the client.  This means  the client can message the server, but the server
//can also message the client.  This is EXTREMELY useful for web applications that need real-time 
//comminucations between clients and server.
var socketModule = function(io, database) {
    var self = this;

    //calling this function will activate sockets, and enable users to connect to the app.
    self.activateSockets = function() {

        io.on('connection', function(socket){
            console.log('a user has connected via socket.');          

            socket.on('disconnect', function(){
              console.log('a user has disconnected');
            });    

            socket.on('Dominic', function(){
                //you can also write to the terminal on the server.
                console.log("Hi Dominic. (this message appears on the commmad line of the server, amazing for debugging");
                io.emit('messageFromServer', 'Hey Dom');
            });

            socket.on('getUsers', function(){
                database.fetchAll("SELECT * FROM User", function(data) {
                    io.emit('usersInfo', JSON.stringify(data));
                });
            });   
        });    
    };
};

//allow this entire file  to be exported to application.js 
module.exports = socketModule;

