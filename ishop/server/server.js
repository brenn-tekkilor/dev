'use strict';

require('dotenv').config()
const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dbOptions = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
};
const db = mongoose.connect(process.env.MONGO_URL, dbOptions);
const storeSchema = require('./model/storeSchema.js').StoreSchema;
var Stores = mongoose.model('Stores', storeSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://ishop.auth0.com/.well-known/jwks.json" // @TODO: remove domain name
    }),
    audience: 'http://localhost:3001',
    issuer: "https://ishop.auth0.com/", // @TODO: remove domain name
    algorithms: ['RS256']
});

app.get('/api/shop/stores', authCheck, (req, res) => {
  console.log("get api/shop/stores requested on REST server");
  console.log("request headers:");
  console.log(req.rawHeaders);
  if (db) {
      console.log("mongodb connected");
      console.log("creating query object on Stores");
      let query = Stores.find().where('isActive', true)
      console.log("executing query");
      query.exec(function(err, docs) {
          if(err) throw err;
          if(docs.length > 0){
            console.log("Documents Found");
            for (var i in docs) {
              console.log(docs[i].name +' ' + docs[i].isActive);
            }  
            console.log("building response");
            res.json(docs);
          } else {
              console.log("no result found");
              console.log("building fail return");
              return res.status(200).json({
                  status: 'fail',
                  message: 'Query Failed'
              });
          }
      });
  }
})

app.listen(3001);
console.log('Listening on localhost:3001');