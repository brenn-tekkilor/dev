var mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');

//create a schema
var businessUnitSchema = new mongoose.Schema(
{
    name: {type: Number, unique: true, required: true},
    banner: String,
    vanityName: String,
    addressLine1: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    isPrinting: {type: Boolean, required: true},
    taxRetail: Number,
    taxFood: Number,
    geoCity: String,
    geoState: String,
    zipCode: Number,
    geoCountry: String,
    url: String,
    point: mongoose.Schema.Types.Point
}, {collection: 'businessUnit'});
businessUnitSchema.index({name:1});
exports.businessUnitSchema = businessUnitSchema;
