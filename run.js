'use strict';

var imp = require('./bin/import.js'),
	fs	= require('fs');

var conf = JSON.parse(fs.readFileSync('./conf/bom-map.json', 'utf8'));
imp.create('./input.csv', conf, {});