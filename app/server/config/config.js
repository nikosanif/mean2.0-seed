var environment = process.env.NODE_ENV || 'production';

var config = require('./env/' + environment);

//Set true/false if we want to use MongoDB
// 	If true then you have to run "mongod" to start MongoDB
// 	and set properties at src/config/env/ 
config.ENABLE_MongooseDB_CONNECTION = false;

module.exports = config;
