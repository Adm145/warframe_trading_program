const express = require('express');
const route = express.Router();
const { 
    getAllItemsController,
    getItemStatisticsController,
    getItemDetails
} = require('../controllers/items.controller');

route.get('/all', getAllItemsController); // get -> localhost:3500/items/
route.get('/:item_name', getItemDetails); // get -> localhost:3500/items/:item_name
route.get('/:item_name/statistics', getItemStatisticsController); // get -> localhost:3500/items/:item_name/statistics

module.exports = route;