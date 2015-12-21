var express = require('express');
var bodyparser = require('body-parser');
var fs = require('fs');
var multer = require('multer');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyparser.urlencoded({
    extended: false
});

var app = express();

app.use(urlencodedParser);
app.use(multer({
    dest: '/'
}));
app.use(express.static('static'));


var server = app.listen(8082, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});

var handleGETHome = function(req, res) {
    res.sendfile(__dirname + "/" + "index.html");
};


var uploadfile = function(req, res) {
    console.log(req.asher);
};

app.get('/', handleGETHome);
app.get('/index.html', handleGETHome);
app.get('/filemanager', function(req, res) {
    res.sendfile(__dirname + "/pages/" + "upload.html");
});

app.get('/form', function(req, res) {
    res.sendfile(__dirname + "/pages/" + "form.html");
});


app.post('/', function(req, res) {
    res.send('POST Hello World');
});

app.post('/upload', uploadfile);




app.post('/process', function(req, res) {

    // Prepare output in JSON format
    var response = {
        fir_name: req.body.first_name,
        las_name: req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});
