(function() {
	//TODO: No error handling!
	'use strict';

	module.exports.create = function(src, conf, options) {
		//TODO: Need to apply template and export file
		var dst		= "",
			lines	= [],
			headers	= [],
			data 	= [],
			e 		= [];

		src = getData(src);
		data = src.data;
		e = src.errors;

		//TODO: Make generic for imports - take fields from the conf file
		for (var i in data) {
			var line = data[i];
			dst += '<csvAssemblyAddLoad handler="wt.part.LoadPart.addPartToAssemblyLoad">\n';
			dst += '<csvassemblyPartNumber>' + line['Parent Number'] + '</csvassemblyPartNumber>\n';
			dst += '<csvconstituentPartNumber>' + line['Child Number'] + '</csvconstituentPartNumber>\n';
			dst += '<csvconstituentPartQty>' + line['Quantity'] + '</csvconstituentPartQty>\n';
			dst += '<csvconstituentPartUnit>' + line['UOM'] + '</csvconstituentPartUnit>\n';
			dst += '<csvassemblyPartVersion>' + line['Parent Revision'] + '</csvassemblyPartVersion>\n';
			dst += '<csvassemblyPartIteration>' + line['Parent Iteration'] + '</csvassemblyPartIteration>\n';
			dst += '<csvassemblyPartView>Design</csvassemblyPartView>\n';
			dst += '<csvorganizationName></csvorganizationName>\n';
			dst += '</csvAssemblyAddLoad>\n';

		}

		return dst;

	};

	function getData(src, conf) {

		var fs 		= require('fs'),
			data 	= [],
			e 		= [],
			lines	= [],
			heads 	= [];

		// Handle multiple src files (array)
		if (src instanceof Array) {
			for (var file in src) {
				data = data.concat(getData(src[file]));
			}
			
			return data;

		}

		src	= fs.readFileSync(src, 'utf8');
		lines 	= src.split("\r\n");
		heads = lines[0].split(',');

		for(var i = 1; i < lines.length; i++){
			var entry	= {},
				line 	= lines[i].split(",");
	 
			for(var j = 0; j < heads.length; j++){
				entry[heads[j]] = line[j];
			}
	 
	 		if (line.length !== heads.length) {
				e.push(entry);
				continue;
			}
			data.push(entry);
	 
		}
	  
		return {"data": data, "errors": e};

	}

	function validate(line, conf) {
		//TODO: Used to validate a line of data - based on the conf file

	}

})();