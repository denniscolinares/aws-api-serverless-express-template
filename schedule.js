'use strict';

const config = require('./config/config');
const appRoot = require('app-root-path');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const Promise = require('bluebird');
const winston = require('./library/winston');
const _ = require('lodash');

module.exports.files = function(event, context, cb){
	const scheduleFiles = {},
			scheduleDir = appRoot + "/api/schedule";
	
	winston.debug("Get all scheduled scripts");
	
	fs.readdirSync(scheduleDir).filter((file) => {
		return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
	}).forEach((file) => {
		const schema = require(path.join(scheduleDir, file)),
				filename = _.trim(file.replace(".js", ""), "");
		
		scheduleFiles[filename] = schema;
	});
	
	return scheduleFiles;
};
