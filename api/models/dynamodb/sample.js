'use strict';

const uuid = require('../../../library/uuid');
const moment = require('moment-timezone');
const _ = require('lodash');
const config = require('../../../config/config');

module.exports = function(dynamoose) {
	
	const dynamoSchema = new dynamoose.Schema({
		ownerId : {
			type : Number,
			validate : function(v) {
				return v > 0;
			},
			hashKey : true
		},
		name : {
			type : String,
			rangeKey : true,
			index : true // name: nameLocalIndex, ProjectionType: ALL
		},
		breed : {
			type : String,
			trim : true,
			required : true,
			index : {
				global : true,
				rangeKey : 'ownerId',
				name : 'BreedIndex',
				project : true, // ProjectionType: ALL
				throughput : 5 // read and write are both 5
			}
		},
		age : {
			type : Number,
			index : {
				global : true,
				name : 'AgeIndex',
				project : true,
				throughput : 5
			}
		},
		createdAt : {
			type : Date,
			index : {
				global : true,
				name : 'createdAtIndex',
				project : true,
				throughput : 5
			}
		},
		updatedAt : {
			type : Date
		}
	}, {
		throughput : {
			read : 5,
			write : 5
		},
		timestamps : true
	});
	
	const models = {
		name : "seaoil_api_serverless_template",
		schema : dynamoSchema
	};
	
	return models;
};
