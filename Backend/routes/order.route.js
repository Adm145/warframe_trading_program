const express = require('express');
const route = express.Router();
const { 
    postNewOrder,
    updateOrderById,
    deleteOrderById,
    closeOrderById
} = require('../controllers/order.controller');



route.post('/add/:item_name', postNewOrder)  // post -> localhost:3500/order/add/:item_name
route.patch('/update/:order_id', updateOrderById)  // patch -> localhost:3500/order/update/:order_id
route.delete('/delete/:order_id', deleteOrderById)  // delete -> localhost:3500/order/delete/:order_id
route.post('/close/:order_id', closeOrderById)  // post -> localhost:3500/order/close/:order_id

module.exports = route;