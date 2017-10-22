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

//add data 
exports.addItem = (shopName, item) => {
    //init shop list
    if(!dataJson[shopName]) dataJson[shopName] = [];

    //add item
    dataJson[shopName].push(item);

    //save file
    _saveFile();
};

//remove all items for a shop 
exports.removeAllItems = (shopName) => {
    dataJson[shopName] = [];

    //save file
    _saveFile();
};

//remove an item for a shop 
exports.removeItem = (shopName, item) => {
    let ret = false;
    if(dataJson[shopName]) {
        const index = dataJson[shopName].indexOf(item);
        if (index > -1) {
            dataJson[shopName].splice(index, 1);
            ret = true;
        }
    }    
    //save file
    _saveFile();

    return ret;
};

//clear all data 
exports.clearAll = () => {
    dataJson = {};

    //save file
    _saveFile();
};

//get data
exports.getItems = (shopName) => {
    return dataJson[shopName]; 
};

//get data
exports.getAll = () => {
    return dataJson; 
};
