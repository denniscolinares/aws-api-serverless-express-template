'use strict';

const config = require('../config/config');
const AWSXRay = require('aws-xray-sdk');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

AWS.config.update({
	accessKeyId : config.amazon.accessKeyId,
	secretAccessKey : config.amazon.secretAccessKey,
	region : config.amazon.s3.region
});

module.exports = AWS;
