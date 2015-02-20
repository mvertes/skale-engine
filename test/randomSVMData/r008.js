#!/usr/local/bin/node --harmony

// Test randomSVMData -> filter -> count

var co = require('co');
var ugrid = require('../../lib/ugrid-context.js')();
var ml = require('../../lib/ugrid-ml.js');

co(function *() {
	yield ugrid.init();

	function positiveLabel(v) { return v[0] > 0; }

	var N = 5, D = 2, seed = 1;
	var ref = ml.randomSVMData(N, D, seed).filter(positiveLabel).length;
	var res = yield ugrid.randomSVMData(N, D, seed).filter(positiveLabel).count();
	console.assert(ref == res);

	ugrid.end();
})();
