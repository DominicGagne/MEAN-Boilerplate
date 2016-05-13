var socketModule = function(io, database) {
    var self = this;

    self.activateSockets = function() {

        io.on('connection', function(socket){
            console.log('a user has connected via socket.');          

            socket.on('disconnect', function(){
              console.log('a user has disconnected');
            });    

            socket.on('Oliver', function(){
                //io.emit sends a message via socket to ALL users, including the user who called 'Oliver'
                io.emit('messageFromServer', "Hi Oliver!");
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

