require("dotenv").config();
const { getItemId } = require("../utils/item.util");
const { getSession } = require("../utils/session.util");

const orderBaseUrl = `${process.env.WARFRAME_MARKET_API_V2}/order`;

// POST localhost:3500/order/add/:item_name  (e.g. /order/add/blind_rage)
// Body:
// {
//   "type": "sell",
//   "platinum": 20,
//   "quantity": 1,
//   "rank": 10          <- omit entirely for non-rankable items (sets, etc.)
// }
const postNewOrder = async (req, res) => {
    const itemName = req.params.item_name;
    const { type, platinum, quantity, rank } = req.body;
    const itemId = await getItemId(itemName);
    try {
          const { token } = getSession();

          const response = await fetch(`${orderBaseUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            // body: JSON.stringify({ itemId: itemId, type, platinum, quantity, rank }),
            body: JSON.stringify({ itemId, type, platinum, quantity, rank }),
          });

          if (!response.ok) {
            const detail = await response.text();
            return res.status(response.status).json({ detail });
          }

          const data = await response.json();
          console.log("status 200 ok");
          console.log(data);
          res.json(data);
    } catch (err) {
        // res.error(err)
        console.log("error");
    }
}

// PATCH localhost:3500/order/update/:order_id
// Body (any subset of order fields - only fields you send get changed):
// {
//   "platinum": 9,
//   "quantity": 2,
//   "visible": true
// }
const updateOrderById = async (req, res) => {
    const orderId = req.params.order_id;
    try {
          const { token } = getSession();

          const response = await fetch(`${orderBaseUrl}/${orderId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify(req.body),
          });

          if (!response.ok) {
            const detail = await response.text();
            return res.status(response.status).json({ detail });
          }

          const data = await response.json();
          console.log("status 200 ok");
          console.log(data);
          res.json(data);
    } catch (err) {
        // res.error(err)
        console.log("error");
    }
}

// DELETE localhost:3500/order/delete/:order_id
// No body needed.
const deleteOrderById = async (req, res) => {
    const orderId = req.params.order_id;
     try {
          const { token } = getSession();

          const response = await fetch(`${orderBaseUrl}/${orderId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            }
          });

          if (!response.ok) {
            const detail = await response.text();
            return res.status(response.status).json({ detail });
          }

          const data = await response.json();
          console.log("status 200 ok");
          console.log(data);
          res.json(data);
    } catch (err) {
        // res.error(err)
        console.log("error");
    }
}

// POST localhost:3500/order/close/:order_id
// Body (optional - omit "quantity" entirely to close the order fully):
// {
//   "quantity": 3
// }
//only closes the entire order if "quantity" is undefined OR newQuantity >= currQuantity
const closeOrderById = async (req, res) => {
    const orderId = req.params.order_id;
    const { quantity } = req.body;
    const { token } = getSession();

    const deleteOrder = () =>
        fetch(`${orderBaseUrl}/${orderId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
        });

    try {
          let response;

          if (quantity === undefined) {
              response = await deleteOrder();
          } else {
              // quantity given - need the order's current quantity first,
              // since there's no "get single order" endpoint
              const ordersResponse = await fetch(`${process.env.WARFRAME_MARKET_API_V2}/orders/my`, {
                headers: { "Authorization": token },
              });

              if (!ordersResponse.ok) {
                const detail = await ordersResponse.text();
                return res.status(ordersResponse.status).json({ detail });
              }

              const { data: orders } = await ordersResponse.json();
              const currentOrder = orders.find((order) => order.id === orderId);

              if (!currentOrder) {
                  return res.status(404).json({ detail: "Order not found." });
              }

              const newQuantity = currentOrder.quantity - quantity;

              response = newQuantity <= 0
                ? await deleteOrder()
                : await fetch(`${orderBaseUrl}/${orderId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token,
                    },
                    body: JSON.stringify({ quantity: newQuantity }),
                  });
          }

          if (!response.ok) {
            const detail = await response.text();
            return res.status(response.status).json({ detail });
          }

          const data = await response.json();
          console.log("status 200 ok");
          console.log(data);
          res.json(data);
    } catch (err) {
        // res.error(err)
        console.log("error");
    }
}


module.exports = {
    postNewOrder,
    updateOrderById,
    deleteOrderById,
    closeOrderById
}