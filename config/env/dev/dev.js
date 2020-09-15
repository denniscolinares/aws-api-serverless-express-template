'use strict';

const develop = (env) => {
	return {
		application : {
			version : env.APP_VERSION,
			ssl : env.APP_HOST_SSL,
			cmsDomain : "",
			cdnDomain : "",
			defaultTimezone : env.APP_TIMEZONE,
			dateFormat : "YYYY-MM-DD HH:MM:ss.SSSS"
		},
		database : {
			rdbms : {
				enabled : false,
				driver : env.DB_DRIVER,
				host : env.DB_HOST,
				port : env.DB_PORT,
				username : env.DB_USERNAME,
				password : env.DB_PASSWORD,
				database : "",
				ssl : env.DB_SSL,
				pool : false
			},
			mongodb : {
				enabled : false,
				driver : "mongodb",
				host : env.DB_MONGO_HOST,
				port : env.DB_MONGO_PORT,
				username : env.DB_MONGO_USERNAME,
				password : env.DB_MONGO_PASSWORD,
				database : "",
				ssl : env.DB_MONGO_SSL,
				debug : true
			},
			dynamodb : {
				enabled : false,
				region : "ap-southeast-1",
				autoCreateTable : true,
				update : true,
				waitForActive : {
					enabled : true,
					check : {
						timeout : 180000,
						frequency : 1000
					}
				},
				encryption : false,
				streamOptions : false,
				prefix : "",
				suffix : "-dev"
			},
			cache : {
				enabled : false,
				driver : env.CACHE_DRIVER,
				database : env.CACHE_NAME,
				host : env.CACHE_HOST,
				port : env.CACHE_PORT,
				cluster : env.CACHE_CLUSTER
			}
		},
		session : {
			name : "SESS",
			prefix : "seaoil-sess",
			secretKey : "",
			proxy : undefined,
			ttl : 260,
			db : 0
		},
		cookies : {
			domain : "",
			path : "/",
			secure : false,
			httpOnly : false,
			maxAge : null,
			sameSite : true
		},
		headers : {
			cors : {
				allowAll : true,
				whitelist : [
					"localhost"
				],
				methods : [
					"DELETE",
					"GET",
					"HEAD",
					"OPTIONS",
					"POST",
					"PUT"
				],
				allowedHeaders : [
					"Content-Type",
					"Referer",
					"User-Agent",
					"Authorization"
				],
				maxAge : 3600,
				credentials : false
			}
		},
		amazon : {
			accessKeyId : env.AWS_ACCESS_KEY_ID,
			secretAccessKey : env.AWS_SECRET_ACCESS_KEY,
			s3 : {
				region : "ap-southeast-1",
				bucketName : ""
			},
			ses : {
				server : "",
				port : 465,
				tls : true,
				auth : {
					user : "",
					pass : ""
				}
			}
		},
		google : {
			firebase : {
				admin : {
					type : "service_account",
					projectId : "price-tool-dev",
					privateKeyId : "bb238fd3fc666abfd6abcb4b3c4dfe6492d3774e",
					privateKey : "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDHlxrxu3zVt5ZY\nOhY1xqepg9No0Aorc/1ipUsUiMeguaxb8NgEKht5dI/NW/9eBEtyxIqBmr0wCEga\nUTxfzaVfttIGpmnnXSqZeK67mP040KOp7iOn+IVdzzZoi/myXsohplzX6l9T0E69\n6KCxD+7PAvh8bQyMVF/swjTTByKwQu3dUM6LKByS9haUt3Mbm6D+DcHl+k5E8okF\ntu47qGwkX/sYsP8FebZgPntqvRd4S/NUdwpEjIhdiwDJkYzPSprbslRO8WTt/Dzn\n1XsOzR+Kjn33Ba851xlhzo0jW7R5SuLVZPhuABD1Dw7tAyFM/CGHIjf2p+1leLra\np4dlFoWNAgMBAAECgf9bkGivmeIAm6p567pEuIjdH0fBIz4xzZLGdbj8B/zihoSo\njNU3votN9A8hJy/j1WnkBA2/oHZ/5/dk/vwlaTKRfaMVotDy/iA3nXs2lRWWbMvF\nDSXAPtFiG5Fonesod6lf/4CYcQm8abe2Eq1sxnCr3QZbKzpBJq0UDVm8y6Wsi8Y0\nU9tTFyESDItzZcdDaEEw2PfbSY7YqByZ1cKnkRtIJ4H52Ymg894PvCPC1ZR8DJEq\nG7UvRah5NQRnv8XS4EBXB+FhgCzSxB7nE7kQVaYyDyj1auVdqyvSTguDq803iS5s\nRuLlXy5JXMNWJtpEgkAsL6vGqeztQxRubW8jDgECgYEA8sHk+wDiM7rc8erLeTke\nvBOoOzLvO5rf/ZjyokDwxwRR6mMd0hJCC+FCwt6O3cUGQVlmRlwkYi/52YdyJnU3\nBWd+/yi8ZCakUvWWGYTXNn9uQYobIHlaNMijiXFnLIUM7ZZFkkRyXptnbYEnjisv\nuPV0i6frhYgZ55O603YOWoECgYEA0nphw1hBC5ydQGVDorUI9vzSptRkwAbZemTj\n9qDgXrvxs+gkGYATOVw/VtSnTlGB46ZHS6AI0yzkXhzZgHih1K4yXi6UbU1nx07R\nwaAeA3+H2NgpHlxxENID0+R3WqpdD0BNtfO1P89jdzWMsPoEb82EW0Erf0gDBN5m\n0fJTbQ0CgYEAxKuvfmc126ENNXT6iehr7QWj6uoWBV0xEPyjvi4Mo7/tOY45b6LZ\nHVTPSJ8UcbkYm0L5aBFobJ/ftItWQK//9oHl0oTHNABWatuKUnxb+0v8IF7qIUIP\ngen3C/fzFY9pbOas0JZhbiJLBd14FWcJj7hURnyxhApCqmn2FzFy6YECgYEAi2sb\nZP0JoPptw2EQay+Fr60KkA1yayxeVE+OHSi1Vqsh0Gy9tNJ8aWtsXUThSeR9qGDV\nKwfnsJI09w4fGJVPhQSaQn6SPNCgJIpWMO6x0tlgD8gnfH/5OQ4UEQBt+vWMTPTo\nRNUYwxrJpQYomnYSCEjXGmdRu67kqQ30h67/ieUCgYBE+2dh6t104In7aGHOtnHz\nJFivt4l3CsW7yhlunDBdltsi9MrD0BVZD7Kt8rJMFhJbwaclvSPaAtFKg5ivFo18\nLObjkli24JZD7M5/sxUNpuzib5gZZNOkf7aK2QN7BjZkx3HZijlolXG69a63TyPX\nts+xsVlIelSjZq/A8S23hQ==\n-----END PRIVATE KEY-----\n",
					clientEmail : "firebase-adminsdk-uu4yq@price-tool-dev.iam.gserviceaccount.com",
					clientId : "111626227156458647100",
					authUri : "https://accounts.google.com/o/oauth2/auth",
					tokenUri : "https://oauth2.googleapis.com/token",
					authProvider_x509_certUrl : "https://www.googleapis.com/oauth2/v1/certs",
					client_x509_certUrl : "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uu4yq%40price-tool-dev.iam.gserviceaccount.com",
					databaseUrl : "https://price-tool-dev.firebaseio.com"
				},
				client : {
					apiKey : "AIzaSyBeXnkvd6yimLt82HFrrTcQnnmQygwGtrA",
					authDomain : "price-tool-dev.firebaseapp.com",
					databaseURL : "https://price-tool-dev.firebaseio.com",
					projectId : "price-tool-dev",
					storageBucket : "price-tool-dev.appspot.com",
					messagingSenderId : "690026188809",
					appId : "1:690026188809:web:4c6fc4e702fd7bc282e8d8",
					measurementId : "G-KV1KMF9577"
				}
			},
			projectId : "",
			api : {
				key : ""
			}
		},
		sso : {
			domain : "",
			clientId : "",
			secretKey : "",
			audience : "",
			scope : "openid offline_access",
			connection : "Username-Password-Authentication"
		},
		sentry : {
			publicKey : "",
			projectId : "",
			debug : true,
			attachStacktrace : true
		}
	};
};

module.exports = develop;
