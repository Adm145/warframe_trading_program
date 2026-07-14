const { 
   postNewOrderService,
   updateOrderByIdService,
   deleteOrderByIdService,
   closeOrderByIdService,
} = require("../services/order.service");


// POST localhost:3500/order/add/:item_name  (e.g. /order/add/blind_rage)
// Body:
// {
//   "type": "sell",
//   "platinum": 20,
//   "quantity": 1,
//   "rank": 10          <- omit entirely for non-rankable items (sets, etc.)
// }
const postNewOrderController = async (req, res) => {
   const itemName = req.params.item_name;
   const { type, platinum, quantity, rank } = req.body;
   try {
      const data = await postNewOrderService(itemName, type, platinum, quantity, rank);
      res.json(data);
   } catch (err) {
      // res.error(err)
      console.log("error");
   }
};

// PATCH localhost:3500/order/update/:order_id
// Body (any subset of order fields - only fields you send get changed):
// {
//   "platinum": 9,
//   "quantity": 2,
//   "visible": true
// }
const updateOrderByIdController = async (req, res) => {
   const orderId = req.params.order_id;
   const body = req.body;
   try {
      const data = await updateOrderByIdService(orderId, body);
      res.json(data);
   } catch (err) {
      // res.error(err)
      console.log("error");
   }
};

// DELETE localhost:3500/order/delete/:order_id
// No body needed.
const deleteOrderByIdController = async (req, res) => {
   const orderId = req.params.order_id;
   try {
      const data = await deleteOrderByIdService(orderId)
      res.json(data);
   } catch (err) {
      // res.error(err)
      console.log("error");
   }
};

// POST localhost:3500/order/close/:order_id
// Body (optional - omit "quantity" entirely to close the order fully):
// {
//   "quantity": 3
// }
//only closes the entire order if "quantity" is undefined OR newQuantity >= currQuantity
const closeOrderByIdController = async (req, res) => {
   const orderId = req.params.order_id;
   const { quantity } = req.body;

   try {
      const data = await closeOrderByIdService(orderId, quantity)
      res.json(data);
   } catch (err) {
      // res.error(err)
      console.log("error");
   }
};

module.exports = {
   postNewOrderController,
   updateOrderByIdController,
   deleteOrderByIdController,
   closeOrderByIdController,
};
