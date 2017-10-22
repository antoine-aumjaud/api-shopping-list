"use strict";

const express = require('express');

const dataService = require('../service/data-service');

module.exports = express.Router()

.get('/shop/:shopName/item', (req, res) => {
    const ret = dataService.getItems(req.params.shopName);
    if(!ret || ret.size == 0)
        res.status(404).end();
    else res.status(200).send(ret);
})
.post('/shop/:shopName/item', (req, res) => {
    dataService.addItem(req.params.shopName, req.body.item); 
    res.status(201).end();
})
.delete('/shop/:shopName/item/:item', (req, res) => {
    const found = dataService.removeItem(req.params.shopName, req.params.item); //500
    if(!found)
        res.status(204).end();
    res.status(200).end();
})  
.delete('/shop/:shopName/item', (req, res) => {
    dataService.removeAllItems(req.params.shopName);
    res.status(200).end();
})  

.get('/shop', (req, res) => {
    const ret = dataService.getAll();
    res.status(200).send(ret);
})  
.delete('/shop', (req, res) => {
    dataService.clearAll();
    res.status(200).end();
}) 
;

