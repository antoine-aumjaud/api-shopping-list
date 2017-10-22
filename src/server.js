"use strict";

const express    = require('express');
const bodyParser = require('body-parser');

const technicalResource = require('./requesthandler/technical-resource');
const shoppingListResource    = require('./requesthandler/shopping-list-resource');

express()
.use(bodyParser.json())
.use('/', technicalResource)
.use('/secure', shoppingListResource)
.listen(9080);
console.log('Shopping-list-API started on server 9080');

