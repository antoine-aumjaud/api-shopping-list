"use strict";

const fs = require('fs');

const FILE_NAME = 'data/shopping-list.json';

let dataJson;
const _loadFile = () => {
    fs.readFile(FILE_NAME, 'utf8', (err, data) => {
        if (err || !data) dataJson = {};
        else dataJson = JSON.parse(data);
        console.log(`File ${FILE_NAME} loaded`);
    });
};
const _saveFile = () => {
    fs.writeFile(FILE_NAME, JSON.stringify(dataJson, null, 2), 'utf8', function(err) {
        if(err) throw new Error("Can't save file: " + err); //Stop the program
    });
};

_loadFile();

//add shop
exports.addShop = (shopName) => {
    if(!dataJson[shopName]) {
        dataJson[shopName] = [];
        _saveFile();
        return true;
    }
    return false;
};

//add item 
exports.addItem = (shopName, item) => {
    if(dataJson[shopName]) {
        dataJson[shopName].push(item);
        _saveFile();
        return true;
    }
    return false;
};

//remove all items for a shop 
exports.removeAllItems = (shopName) => {
    dataJson[shopName] = [];
    _saveFile();
};

//remove an item for a shop 
exports.removeItem = (shopName, item) => {
    if(dataJson[shopName]) {
        const index = dataJson[shopName].indexOf(item);
        if (index > -1) {
            dataJson[shopName].splice(index, 1);
            _saveFile();
            return true;
        }
    }    
    return false;
};

//remove shop
exports.removeShop = (shopName) => {
    if(dataJson[shopName]) {
        delete dataJson[shopName];
        _saveFile();
        return true;
    }
    return false;
};

//clear all shops and items
exports.removeAllShops = () => {
    dataJson = {};
    _saveFile();
};


//get item
exports.getItems = (shopName) => {
    return dataJson[shopName]; 
};

//get shops and items
exports.getShops = () => {
    return dataJson; 
};

//reload file from disk
exports.resetCache = _loadFile;

