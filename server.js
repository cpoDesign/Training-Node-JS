var http = require('http');
var express = require('express');
var _ = require('underscore');
var app = express();
var ejsEngine = require('ejs-locals');
var url = require('url');
var controllers = require('./controllers');


// Setup view engine
//app.engine('ejs', ejsEngine); // supports master pages (detail)
//app.set('view engine','ejs'); // ejs view engine
app.set('view engine', 'vash'); // ejs view engine

// map controllers
controllers.init(app);

// allow access to public directory
// __dirname => root of directory where server.js is running from
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
});

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


//
app.use('/loadTeamEvents/:teamId/:year/:month', function (request, response) {


    var teamId = request.params.teamId,
        year = request.params.year,
        month = request.params.month;

    var data = {
        title: 'Year:' + year + ' Month:' + month,
        teamId: teamId,
        content: ''
    }

        for (var i = 0; i < 5; i++) {
            data.content += '<li> Team' + data.teamId + ' Event' + i + '</li>';
        }

    response.render('loadTeamEvents', data);

});

var server = http.createServer(app);
server.listen(3000);
