var http = require("http");
var express = require("express");
var fs = require("fs");
var evs = require("events");
var url = require("url");

// Create an eventEmitter object
var eventEmitter = new evs.EventEmitter();

var readerHandler = function read(nameFile) {
    console.log('Request to read file:' + nameFile);
    fs.readFile('ext/' + nameFile, function(err, data) {
        if (err)
            return console.error(err);
        // Fire an event 
        eventEmitter.emit("complete_read");
        console.log(data.toString());
    });
    console.log('Reading data');
};

// Bind the read event with the handler
eventEmitter.on('read', readerHandler);

// Bind the data_received event with the anonymous function
eventEmitter.on('complete_read', function() {
    console.log('File completed');
});


http.createServer(
    function(request, response) {
        // Parse the request containing file name
        var pathname = url.parse(request.url).pathname;
        // Print the name of the file for which request is made.
        console.log("Request for " + pathname + " received.");
        // Read the requested file content from file system
        fs.readFile(pathname.substr(1), function(err, data) {
            if (err) {
                console.log(err);
                // HTTP Status: 404 : NOT FOUND
                // Content Type: text/plain
                response.writeHead(404, {
                    'Content-Type': 'text/html'
                });
            }
            else {
                //Page found	  
                // HTTP Status: 200 : OK
                // Content Type: text/plain
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });

                // Write the content of the file to response body
                response.write(data.toString());
            }
            // Send the response body 
            response.end();
        });
        // response.end('Hello World\n');
        eventEmitter.emit('read', 'input.txt');
    }).listen(8081);

console.log('Server running');
console.log(__filename);
console.log(__dirname);