var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

// put publicly accessible directories here
//app.use('/dist', express.static('dist'));
app.use('/app', express.static(path.resolve(__dirname, '../../client/app')));
//app.use('/libs', express.static(path.resolve(__dirname, '../../client/libs')));
//app.use('/node_modules', express.static('node_modules'));
app.use('/', express.static(path.resolve(__dirname, '../../client/')));
//app.use('/app', express.static(path.resolve(__dirname, '../../client/app')));
//app.use('/libs', express.static(path.resolve(__dirname, '../../client/libs')));
// for system.js to work. Can be removed if bundling.
//app.use(express.static(path.resolve(__dirname, '../../client')));
app.use('/node_modules', express.static(path.resolve(__dirname, '../../../node_modules')));
//console.log(path.resolve(__dirname, '../../../node_modules'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', './client');
app.use(bodyParser.json());

// setup routes
require('../routes/routes').http(app);
require('../routes/routes').socket(app);
var renderIndex = (req, res) => {
    //res.sendFile(path.resolve(__dirname, '../client/index.html'));
    res.render('index');
}
app.get('/', renderIndex);

module.exports = app;
