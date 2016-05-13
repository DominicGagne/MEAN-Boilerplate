var databaseModule = function(mysql) {
    var self = this;

    var connection = mysql.createConnection({
        //  port: 8080,
        host: '127.0.0.1',
        database: 'Inukbook',
        user: 'root',
        password: '',
    });  

    self.acquireConnection = function() {
        //should this be inside of a callback? 
        connection.connect(function(err) {
            // connected;! (unless `err` is set)
            if(err) {
                console.log("Could not connect to db!");
            } else {
                console.log("Connected to the database.");
            }
        });    
    };

    self.fetchAll = function(queryString, callback) {
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            callback(rows);
        });
    };
};


//allow this entire file  to be exported to application.js 
module.exports = databaseModule;

