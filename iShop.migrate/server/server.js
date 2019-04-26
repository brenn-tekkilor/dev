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
const storeSchema = require('./data/schemas/storeSchema.js').StoreSchema;
var Stores = mongoose.model('Stores', storeSchema);
const checkoutSchema = require('./data/schemas/checkoutSchema.js').CheckoutSchema;
var Checkouts = mongoose.model('Checkouts', checkoutSchema);

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

app.get('/api/deals/public', (req, res)=>{
  let deals = [
  {
    id: 12231,
    name: 'Playstation 4 500GB Console',
    description: 'The Playstation 4 is the next gen console to own. With the best games and online experience.',
    originalPrice: 399.99,
    salePrice: 299.99
  },
  {
    id: 12234,
    name: 'Galaxy Note 7',
    description: 'The Note 7 has been fixed and will no longer explode. Get it an amazing price!',
    originalPrice: 899.99,
    salePrice: 499.99
  },
  {
    id: 12245,
    name: 'Macbook Pro 2016',
    description: 'The Macbook Pro is the de-facto standard for best in breed mobile computing.',
    originalPrice: 2199.99,
    salePrice: 1999.99
  },
  {
    id: 12267,
    name: 'Amazon Echo',
    description: 'Turn your home into a smart home with Amazon Echo. Just say the word and Echo will do it.',
    originalPrice: 179.99,
    salePrice: 129.99
  },
  {
    id: 12288,
    name: 'Nest Outdoor Camera',
    description: 'The Nest Outdoor camera records and keeps track of events outside your home 24/7.',
    originalPrice: 199.99,
    salePrice: 149.99
  },
  {
    id: 12290,
    name: 'GoPro 4',
    description: 'Record yourself in first person 24/7 with the GoPro 4. Show everyone how exciting your life is.',
    originalPrice: 299.99,
    salePrice: 199.99
  },
  ];
  res.json(deals);
})

app.get('/api/shop/stores', authCheck, (req, res) => {
  console.log("get api/deals/private requested on REST server");
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

app.get('/api/shop/checkouts/:storeId', authCheck, (req, res) => {
  var storeId = +(req.params.storeId.replace(':', ''));
  console.log("get api/shop/checkouts/" + storeId.toString() + " requested on REST server");
  console.log("request headers:");
  console.log(req.rawHeaders);
  if (db) {
      console.log("mongodb connected");
      console.log("creating query object on Checkouts");
      let query = Checkouts.find().where('storeId',storeId).or([{'registerId':{$lt:20}},{'registerId':{$gte:500}}]);
      console.log("executing query");
      query.exec(function(err, docs) {
          if(err) throw err;
          if(docs.length > 0){
            console.log("Documents Found");
            for (var i in docs) {
              console.log(docs[i].registerId.toString() + " " + docs[i].cashiers.tostring());
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