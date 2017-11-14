#!/usr/bin/env node

var http = require('http');
var url = require('url');

if (process.argv.length < 4) {
	console.log("Usage: submit.js skale_server_url program_file [args...]");
	process.exit(1);
}
var href = url.parse(process.argv[2]);
var postdata = JSON.stringify({src: process.argv[3], args: process.argv.slice(4)});
var options = {
	hostname: href.hostname,
	port: href.port,
	path: '/exec',
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Content-Length': postdata.length
	}
};
var response = '';
var req = http.request(options, function (res) {
	res.setEncoding('utf8');
	res.on('data', function (d) {response += d;});
	res.on('end', function () {
		var resp = JSON.parse(response);
		if (resp.stdout) process.stdout.write(resp.stdout);
		if (resp.stderr) process.stderr.write(resp.stderr);
		process.exit(response.err);
	});
});
req.on('error', function (err) {throw err;});
req.end(postdata);