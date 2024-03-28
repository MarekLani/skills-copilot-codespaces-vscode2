// create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/comments', function(req, res) {
    fs.readFile(__dirname + '/public/comments.json', 'utf8', function(err, data) {
        res.setHeader('Content-Type', 'application/json');
        res.end(data);
    });
});

app.post('/comments', function(req, res) {
    fs.readFile(__dirname + '/public/comments.json', 'utf8', function(err, data) {
        var comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(__dirname + '/public/comments.json', JSON.stringify(comments, null, 4), function(err) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(comments, null, 4));
        });
    });
});

app.listen(port, function() {
    console.log('Server running at http://localhost:' + port);
});