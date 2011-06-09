/*
This script will tail (following) a file and stream new data out to clients 
connected  via a WebSocket. The file to tail and the tcp port need to be 
specified when launching this process:
 
 Usage: node tail2socket.js <tailFile> <port>
 
 This relies on the WebSocket  library : URL
 NOTE: As of 2010-10-20 the WebSocket spec and this library are in active 
 development. If this code doesn't work check for updated lib and browser.
*/
var util = require("util");
var ws = require('./lib/ws');
var spawn = require('child_process').spawn;

var debug = false;
var tailFile = process.ARGV[2];
var port = process.ARGV[3];
var eachLine = /^(.*)$/mg;


var log = function(message){
	!debug ? null : util.puts(message);
}

var 	server = ws.createServer();
		server.listen(port);

	
var processNewLines = function(data){
	log("/****" + data +"******/");
	var line = String(data).match(eachLine);
	if (line && line.length){
		for (var i = 0 ; i < line.length; i++){
		log(line[i]);
			server.broadcast(line[i]);
		}
	}
};

var 	tail = spawn("tail", ["-f", tailFile]);
		tail.stdout.on("data", processNewLines );
