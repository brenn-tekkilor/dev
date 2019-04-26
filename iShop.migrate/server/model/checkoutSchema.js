var mongoose = require('mongoose');

var checkoutSchema = new mongoose.Schema(
{   
    storeId: {type: Number, required: true},
    registerId: {type: Number, required: true},
    cashiers: [{ name: 'string'}]
}, {collection: 'checkout'});

exports.CheckoutSchema = checkoutSchema;
