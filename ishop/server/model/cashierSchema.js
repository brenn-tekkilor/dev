var mongoose = require('mongoose');

var cashierSchema = new mongoose.Schema(
    {
        name: {type: String, required: true}
    }, {collection: 'cashiers'});
exports.CashierSchema = cashierSchema;