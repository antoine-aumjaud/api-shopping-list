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
.get('/shops', (req, res) => {
    const ret = dataService.getShops();
    res.status(200).send(ret);
})  
.post('/shops', (req, res) => {
    dataService.addShop(req.body.shopName); 
    res.status(201).end();
})
.delete('/shops/:shopName', (req, res) => {
    const ret = dataService.removeShop(req.params.shopName);
    if(!ret)
        res.status(404).end();
    else res.status(200).send(ret);
}) 
.delete('/shops', (req, res) => {
    dataService.removeAllShops();
    res.status(200).end();
}) 

//item
.get('/shops/:shopName/items', (req, res) => {
    const ret = dataService.getItems(req.params.shopName);
    if(!ret || ret.size == 0)
        res.status(404).end();
    else res.status(200).send(ret);
})
.post('/shops/:shopName/items', (req, res) => {
    const added = dataService.addItem(req.params.shopName, req.body.item); 
    if(!added)
        res.status(404).end();
    else res.status(201).end();
}) 
.delete('/shops/:shopName/items', (req, res) => {
    dataService.removeAllItems(req.params.shopName);
    res.status(200).end();
})
.delete('/shops/:shopName/items/:item', (req, res) => {
    const found = dataService.removeItem(req.params.shopName, req.params.item);
    if(!found)
        res.status(404).end();
    else res.status(200).end();
})   
;

