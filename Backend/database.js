var databaseModule = function(mysql) {
    var self = this;

    //FIXME: FATAL: This should be in a crypto file and then loaded from there.
    //Take a look at how F2F loads their crypto file.
    //Ask Justin if you need help.
    var connection = mysql.createConnection({
        //  port: 8080,
        host: '127.0.0.1',
        database: 'Inukbook',
        user: 'root',
        password: '',
    });  

    //Is this function complete?
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
        //FIXME: FATAL: I could likely SQL inject this function since you are just running the query on whatever string I pass to you.
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            callback(rows);
        });
    };
};


//allow this entire file  to be exported to application.js 
module.exports = databaseModule;

