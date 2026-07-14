const express = require("express");
const route = express.Router();
const { 
   getOrderHistoryController 
} = require("../controllers/orderHistory.controller");

route.get("/:window", getOrderHistoryController); // get -> localhost:3500/order-history/:window (24h/48h/7d/14d)

module.exports = route;
