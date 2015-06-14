(function() {

'use strict';

module.exports.Validate = function () {

	var fs 		= require('fs'),
		conf 	= JSON.parse(fs.readFileSync('../conf/item-map.json', 'utf8')),
		e		= [],
		w		= [];

	for (var i in conf) {
		var a = conf[i];

		// Required
		var req = ['input', 'description', 'required'];

		for (var j in req) {
			if (a[req[j]] === undefined) e.push(req[j] + " missing from " + i);
		}

		// Split
		if (a['allow-split']) {
			if (a['split-naming'] === undefined)
				e.push("Missing split naming from " + i);

			if (a['max-length'] === undefined && a.delimiter === undefined)
				w.push("Missing a split criterion from " + i);
		}

	}

	return {"errors" : e, "warnings" : w};

};

})();