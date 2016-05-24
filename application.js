//here I define our app as an express application, as well as several useful utilities.

//included are http for the API endpoints, and io for the use of sockets.  This will be useful when
//we need users to upload photos, videos, and other multimedia.  Sockets will also allow for the 
//server to communicate directly to the client.

//read and write locks have been included.  Mutexes will be required when updating content posted to
//Inukbook when we get the forums written.

//and of course, mysql, because I love it and don't know MongoDB.

var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/'));
var http = require('http').Server(app);
var io = require('socket.io')(http);
const fs = require('fs');
var ReadWriteLock = require('rwlock');
var lock = new ReadWriteLock();
var mysql = require('mysql');


//load our database module, and allow for connections to be made.
var databaseModule = require('./Backend/database.js');
var database = new databaseModule(mysql);

//load our sockets module, and activate socket listeners.
var socketsModule = require('./Backend/socketAPI.js');
var sockets = new socketsModule(io, database);
sockets.activateSockets();

//load our API code, and activate the endpoints.
var endpointsAPIModule = require('./Backend/endpointsAPI.js');
var endpointsAPI = new endpointsAPIModule(app, __dirname, database);
endpointsAPI.activateEndpoints();





//project is fully initialized, listen on port 3000 and await user action.
http.listen(3000, function(){
  console.log('listening on *:3000');
});

