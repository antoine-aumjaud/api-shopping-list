"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const nodelib    = require('api-nodelib');

const technicalRouter = new nodelib.ExpressApp('api-shopping-list').router();
const shoppingListResource = require('./requesthandler/shopping-list-resource');

express()
.use(bodyParser.json())
.use('/', technicalRouter)
.use('/secure', shoppingListResource)
.listen(9080);
console.log('Shopping-list-API started on server 9080');

