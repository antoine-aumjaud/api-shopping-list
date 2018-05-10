"use strict";

const express = require('express');

const dataService = require('../service/data-service');

module.exports = express.Router()

//Reset cache
.get('/resetCache', (req, res) => {
    dataService.resetCache() 
    res.status(200).send("done");
})

//shop
.get('/shop', (req, res) => {
    const ret = dataService.getShops();
    res.status(200).send(ret);
})  
.post('/shop', (req, res) => {
    dataService.addShop(req.body.shopName); 
    res.status(201).end();
})
.delete('/shop/:shopName', (req, res) => {
    const ret = dataService.removeShop(req.params.shopName);
    if(!ret)
        res.status(404).end();
    else res.status(200).send(ret);
}) 
.delete('/shop', (req, res) => {
    dataService.removeAllShops();
    res.status(200).end();
}) 

//item
.get('/shop/:shopName/item', (req, res) => {
    const ret = dataService.getItems(req.params.shopName);
    if(!ret || ret.size == 0)
        res.status(404).end();
    else res.status(200).send(ret);
})
.post('/shop/:shopName/item', (req, res) => {
    const added = dataService.addItem(req.params.shopName, req.body.item); 
    if(!added)
        res.status(404).end();
    else res.status(201).end();
}) 
.delete('/shop/:shopName/item', (req, res) => {
    dataService.removeAllItems(req.params.shopName);
    res.status(200).end();
})
.delete('/shop/:shopName/item/:item', (req, res) => {
    const found = dataService.removeItem(req.params.shopName, req.params.item);
    if(!found)
        res.status(404).end();
    else res.status(200).end();
})   

;

