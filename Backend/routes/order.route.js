const express = require("express");
const route = express.Router();
const {
   postNewOrderController,
   updateOrderByIdController,
   deleteOrderByIdController,
   closeOrderByIdController,
} = require("../controllers/order.controller");

route.post("/add/:item_name", postNewOrderController); // post -> localhost:3500/order/add/:item_name
route.patch("/update/:order_id", updateOrderByIdController); // patch -> localhost:3500/order/update/:order_id
route.delete("/delete/:order_id", deleteOrderByIdController); // delete -> localhost:3500/order/delete/:order_id
route.post("/close/:order_id", closeOrderByIdController); // post -> localhost:3500/order/close/:order_id

module.exports = route;
