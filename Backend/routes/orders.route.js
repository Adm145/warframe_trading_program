const express = require("express");
const route = express.Router();
const {
   getOrdersForItemController,
   getTopOrdersForItemController,
   getUserOrdersController,
} = require("../controllers/orders.controller");

route.get("/item/:item_name", getOrdersForItemController); // get -> localhost:3500/orders/:item_name
route.get("/top/:item_name", getTopOrdersForItemController); // get -> localhost:3500/orders/:item_name/top
route.get("/user", getUserOrdersController); // get -> localhost:3500/orders/user

module.exports = route;
