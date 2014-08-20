// to execute this you need to call from root application "node 1/server.js"

var express = require('express');
var app = express();
var router = express.Router();

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

    res.writeHead(200, {'Content-Type': 'text/plain'});
    next();
});


app.get('/', function (req, res) {
    res.end('Hello world \n' + req.url);
});

app.use('/loadTeamEvents/:teamId/:year/:month', function (req, res) {


    var teamId = req.params.teamId,
        year = req.params.year,
        month = req.params.month;

    res.write('<h2>');
    res.write('Year:' + year + ' Month:' + month);
    res.write('</h2>');
    res.write('<ul>');

    setTimeout(function () {

        for (var i = 0; i < 5; i++) {
            res.write('<li> Team' + teamId + ' Event' + i + '</li>');
        }
        res.write('</ul>');
        res.end();
    }, 2000);


});

app.listen(3000);

