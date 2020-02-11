'use strict';

const uuid = require('../../../library/uuid');
const moment = require('moment');
const config = require('../../../config/config');
const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
	const product = sequelize.define("products", {
		id : {
			type : DataTypes.UUIDV4,
			allowNull : false,
			defaultValue: uuid.v4(),
			validate: {
				isUUID: 4
			},
			primaryKey : true
		},
		organization_id : {
			type : DataTypes.UUIDV4,
			allowNull : false,
			validate: {
				isUUID: 4
			},
			references : {
				model : "organizations",
				key : "id"
			}
		},
		organization_created_id : {
			type : DataTypes.UUIDV4,
			validate: {
				isUUID: 4
			},
			allowNull : false,
			defaultValue : ""
		},
		supplier_id : {
			type : DataTypes.UUIDV4,
			validate: {
				isUUID: 4
			},
			get() {
				return this.getDataValue("supplier_id") || "";
			},
			allowNull : false
		},
		client_id : {
			type : DataTypes.UUIDV4,
			validate: {
				isUUID: 4
			},
			allowNull : false
		},
		product_code : {
			type : DataTypes.STRING(255),
			allowNull : false
		},
		product_code_client : {
			type : DataTypes.STRING(255),
			allowNull : false
		},
		product_name : {
			type : DataTypes.STRING(255),
			allowNull : false
		},
		sku_code : {
			type : DataTypes.STRING(255),
			allowNull : false
		},
		category : {
			type : DataTypes.STRING(255),
			allowNull : false
		},
		summary : {
			type : DataTypes.TEXT,
			allowNull : false,
			defaultValue : ""
		},
		description : {
			type : DataTypes.TEXT,
			allowNull : true,
			defaultValue : ""
		},
		currency : {
			type : DataTypes.CHAR(5),
			allowNull : true,
			defaultValue : "USD",
			set(value) {
				this.setDataValue("currency", value.toString().toLocaleUpperCase());
			}
		},
		quantity_per_pack : {
			type : DataTypes.INTEGER(10),
			allowNull : true,
			defaultValue : 0
		},
		order_quantity : {
			type : DataTypes.INTEGER(10),
			allowNull : true,
			defaultValue : 0
		},
		stock_quantity : {
			type : DataTypes.INTEGER(10),
			allowNull : true,
			defaultValue : 0
		},
		stock_status : {
			type : DataTypes.STRING(100),
			allowNull : false
		},
		status : {
			type : DataTypes.STRING(255),
			allowNull : false,
			defaultValue : "DRAFT"
		},
		price_cost : {
			type : DataTypes.FLOAT,
			allowNull : true,
			defaultValue : 0
		},
		price_retail : {
			type : DataTypes.FLOAT,
			allowNull : true,
			defaultValue : 0
		},
		price_tax : {
			type : DataTypes.FLOAT,
			allowNull : true,
			defaultValue : 0
		},
		weight_unit : {
			type : DataTypes.STRING(30),
			allowNull : false,
			defaultValue : "Kg"
		},
		weight_type : {
			type : DataTypes.STRING(50),
			allowNull : false,
			defaultValue : ""
		},
		weight : {
			type : DataTypes.FLOAT,
			allowNull : false,
			defaultValue : 0
		},
		volume_unit : {
			type : DataTypes.STRING(30),
			allowNull : false,
			defaultValue : "lb"
		},
		volume_amt : {
			type : DataTypes.FLOAT,
			allowNull : false,
			defaultValue : 0
		},
		barcode : {
			type : DataTypes.STRING(255),
			allowNull : true
		},
		barcode_packaging : {
			type : DataTypes.STRING(255),
			allowNull : true
		},
		model_no : {
			type : DataTypes.STRING(255),
			allowNull : true
		},
		serial_no : {
			type : DataTypes.STRING(255),
			allowNull : true
		},
		market_destination : {
			type : DataTypes.STRING(255),
			allowNull : true,
			defaultValue : ""
		},
		packaging_details : {
			type : DataTypes.TEXT,
			allowNull : true,
			defaultValue : ""
		},
		reviewedby_id : {
			type : DataTypes.STRING(255),
			allowNull : true
		},
		approvedby_id : {
			type : DataTypes.STRING(255),
			allowNull : true
		},
		template : {
			type : DataTypes.INTEGER(1),
			allowNull : false,
			defaultValue : 0
		},
		template_id : {
			type : DataTypes.STRING(255),
			allowNull : true
		},
		template_revision : {
			type : DataTypes.INTEGER(10),
			allowNull : true,
			defaultValue : 0
		},
		date_delivery : {
			type : DataTypes.DATE,
			allowNull : true,
			set(value){
				let data = value;
				
				if(data !== null){
					data = moment(Number(value) || moment()).format(config.application.dateFormat);
				}
				
				this.setDataValue("date_delivery", data);
			},
			get() {
				const data = this.getDataValue("date_delivery");
				
				if(data !== null){
					return moment(data).valueOf();
				}
				
				return null;
			}
		},
		created_by : {
			type : DataTypes.STRING(255),
			allowNull : false
		},
		updated_by : {
			type : DataTypes.STRING(255),
			allowNull : false
		},
		date_created : {
			type : DataTypes.DATE,
			allowNull : false,
			defaultValue : sequelize.literal("CURRENT_TIMESTAMP"),
			get() {
				return moment(this.getDataValue("date_created")).valueOf();
			}
		},
		date_updated : {
			type : DataTypes.DATE,
			allowNull : false,
			defaultValue : sequelize.literal("CURRENT_TIMESTAMP"),
			get() {
				return moment(this.getDataValue("date_updated")).valueOf();
			}
		}
	}, {
		timestamps : true,
		underscored : true,
		createdAt : 'date_created',
		updatedAt : 'date_updated',
		tableName : "products"
	});
	
	product.beforeBulkCreate((data, opt) => {
		for(var i=0; i < data.length; i++){
			data[i].dataValues.id = uuid.v4();
		}
	});
	
	product.beforeCreate((data, options) => {
		data.dataValues.id = uuid.v4();
	});
	
	product.beforeUpdate((data, options) => {
		
	});
	
	return product;
};
