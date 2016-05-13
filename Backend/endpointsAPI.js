var endpointsAPI  = function(app, rootDir, database) {
    var self = this;

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


        app.get('/getUsers', function(req, res){
            database.fetchAll("SELECT * FROM User", function(data) {
                res.send(JSON.stringify(data));
            });
        });   



             
    };
};

//allow this entire file  to be exported to application.js 
module.exports = endpointsAPI;

