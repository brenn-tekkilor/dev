var mongoose = require('mongoose');

var cashierSchema = new mongoose.Schema(
    {
        storeId: {type: Number, required: true},
        registerId: {type: Number, required: true},
        name: {type: String, required: true}
    }, {collection: 'cashiers'});
exports.CashierSchema = cashierSchema;