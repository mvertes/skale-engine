#!/usr/bin/env node

var assert = require('assert');
var uc = require('ugrid').context();

uc.parallelize([ 1, 2, 3, 1, 4, 3, 5 ]).
  distinct().
  collect().toArray(function(err, res) {
	assert(JSON.stringify(res) === JSON.stringify([4, 1, 5, 2, 3]));  	  
	console.log('Success !') //expected [ 4, 1, 5, 2, 3 ]
	console.log(res);
	uc.end();
})