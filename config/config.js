'use strict';

const envConfig = require('dotenv').config();
const appRoot = require('app-root-path');
const fs = require('fs');
const winston = require('../library/winston');

const config = (env) => {
	
	if(envConfig.error){
		winston.error("Environment Configuration (.env) file not found");
		return {};
	}
	
	const envData = env.parsed;
	const staging = envData.NODE_ENV || process.env.NODE_ENV;
	const enFilePath = `./env/${staging}/${staging}`;
	const path = `${appRoot.path}/config/env/${staging}/${staging}.js`;
	
	if(!fs.existsSync(path)){
		winston.error(`Staging Configuration file not found in "${enFilePath.replace(".","config")}"`);
		return {};
	}
	
	//Default Type of environment variables are STRING. Make sure to convert STRING to BOOLEAN
	envData.DB_MONGO_SSL = envData.DB_MONGO_SSL === "true";
	envData.DB_SSL = envData.DB_SSL === "true";
	envData.CACHE_CLUSTER = envData.CACHE_CLUSTER === "true";
	envData.APP_HOST_SSL = envData.APP_HOST_SSL === "true";
	
	//Set custom environment data
	envData.APP_ROOT = appRoot.path;
	
	return require(enFilePath)(envData);
};

module.exports = config(envConfig);
