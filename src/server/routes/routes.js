var config = require('../config/config');

module.exports.http = (app) => {
    
    app.use('/api/helloworld', function(req, res){
        res.send('Hello World!');    
    });
        
};

module.exports.socket = (app) => {
};