var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var apiRoutes = require('../routes/routes');

app.use('/libs', express.static(path.resolve(__dirname, '../../client/libs')));
app.use('/app', express.static(path.resolve(__dirname, '../../client/app')));

// for system.js to work. Can be removed if bundling.
app.use(express.static(path.resolve(__dirname, '../../client')));
app.use(express.static(path.resolve(__dirname, '../../../../node_modules')));


// setup routes
app.use(bodyParser.json());
app.use('/api', apiRoutes);

var renderIndex = (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/index.html'));
}
app.get('/*', renderIndex);


if(process.env.NODE_ENV === 'developement'){
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error("Not Found");
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});


module.exports = app;
