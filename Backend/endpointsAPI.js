//endpoints module.  This file is the top level of the API.  All calls to the backend
//pass through this module.
//this example only makes use of GET requests, though any type of request can be made.
var endpointsAPI  = function(app, rootDir, database) {
    var self = this;

    //calling this function will activate the API, and enable users to connect to the app.
    self.activateEndpoints = function() {

        //our default endpoint.  When the user loads up the page, send in index.html, which
        //contains the information to load angularJS and all our angular code.
    	app.get('/', function(req, res){
          var path = require('path');
          res.sendfile(rootDir + '/www/index.html');
          database.acquireConnection();
        });

        //an example of how to pass in variables via the URL,
        //courtesy of Breaking Bad, which I've never actually watched lol.
        //let me know if you have any questions about Endpoints in node, I am fairly
        //comfortable with them now.
        
        app.get('/sayMyName/:name', function(req, res){
            //app.set(req.params.name);
            res.send(req.params.name);
        });   


        app.get('/getAllUsers', function(req, res){
            database.fetchAll("SELECT UserID, Name FROM User", function(data) {
                res.send(JSON.stringify(data));
            });
        });   


        app.get('/getLogsByUser', function(req, res){
            database.fetchAll("SELECT * FROM User", function(data) {
                res.send(JSON.stringify(data));
            });
        }); 



             
    };
};

//allow this entire file  to be exported to application.js 
module.exports = endpointsAPI;

