var mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');
var Register = require('./registerSchema').RegisterSchema
//create a schema
var storeSchema = new mongoose.Schema(
{
    storeId: {type: Number, unique: true, required: true},
    name: {type: String, unique: true, required: true},
    addressLine1: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    geoZipCode: Number,
    isActive: {type: Boolean, required: true},
    taxRetail: {type: Number, required: true},
    taxFood: {type: Number, required: true},
    geoCity: String,
    banner: String,
    geoState: String,
    latitude: Number,
    longitude: Number,
    registers: [Register]
}, {collection: 'stores'});
storeSchema.index({storeId:1, name:1});
exports.StoreSchema = storeSchema;
