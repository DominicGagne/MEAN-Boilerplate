//database module. contains the code necessary to access a locally hosted database.
//only two sample call have been written, 'acquireConnection' to establish a 
//connection with the database, and 'fetchAll', to select all rows from a particular query
var databaseModule = function(mysql) {
    var self = this;

    //replace these credentials with your own.
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        database: 'Inukbook',
        user: 'root',
        password: '',
    });  

    //self explanatory, this function connects to a database using
    //the credentials specified above. 
    self.acquireConnection = function() {
        connection.connect(function(err) {
            if(err) {
                console.log("Could not connect to db!");
            } else {
                console.log("Connected to the database.");
            }
        });    
    };

    //fetch all rows on a particular query.  Note that if you should sanitize your SQL statements if
    //the user will at any point be able to modify the query string.
    self.fetchAll = function(queryString, callback) {
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            callback(rows);
        });
    };
};


//allow this entire file  to be exported to application.js 
module.exports = databaseModule;

