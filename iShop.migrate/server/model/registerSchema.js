var mongoose = require('mongoose');
var Cashier = require('./cashierSchema').CashierSchema

//create a schema
var registerSchema = new mongoose.Schema(
{
    registerId: {type: Number, required: true},
    storeId: {type: Number, required: true},
    cashiers: [Cashier]
}, {collection: 'registers'});
exports.RegisterSchema = registerSchema;
