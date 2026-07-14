require("dotenv").config();
const { getItemId } = require("../utils/item.util");
const { getSession } = require("../utils/session.util");

const orderBaseUrl = `${process.env.WARFRAME_MARKET_API_V2}/order`;

const postNewOrderService = async (itemName) => {
   const itemId = await getItemId(itemName);
   const { token } = await getSession();

   const response = await fetch(`${orderBaseUrl}`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: token,
      },
      body: JSON.stringify({ itemId, type, platinum, quantity, rank }),
   });

   if (!response.ok) {
      const detail = await response.text();
      return res.status(response.status).json({ detail });
   }

   const data = await response.json();
   return data;
}

const updateOrderByIdService = (orderId, body) => {
   const { token } = await getSession();
   
   const response = await fetch(`${orderBaseUrl}/${orderId}`, {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json",
         Authorization: token,
      },
      body: JSON.stringify(body),
   });

   if (!response.ok) {
      const detail = await response.text();
      return res.status(response.status).json({ detail });
   }

   const data = await response.json();
   return data;
}

const deleteOrderByIdService = (orderId) => {
   const { token } = getSession();

      const response = await fetch(`${orderBaseUrl}/${orderId}`, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            Authorization: token,
         },
      });

      if (!response.ok) {
         const detail = await response.text();
         return res.status(response.status).json({ detail });
      }

      const data = await response.json();
      return data;
}

const closeOrderByIdService = (orderId, quantity) => {
   const { token } = getSession();
   let response;

      if (quantity === undefined) {
         response = await deleteOrderByIdService(orderId);
      } else {
         // quantity given - need the order's current quantity first,
         // since there's no "get single order" endpoint
         const ordersResponse = await fetch(
            `${process.env.WARFRAME_MARKET_API_V2}/orders/my`,
            {
               headers: { Authorization: token },
            },
         );

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

         response =
            newQuantity <= 0
               ? await deleteOrderByIdService(orderId)
               : await fetch(`${orderBaseUrl}/${orderId}`, {
                  method: "PATCH",
                  headers: {
                     "Content-Type": "application/json",
                     Authorization: token,
                  },
                  body: JSON.stringify({ quantity: newQuantity }),
               });
      }

      if (!response.ok) {
         const detail = await response.text();
         return res.status(response.status).json({ detail });
      }

      const data = await response.json();
      return data;
}

module.exports = {
   postNewOrderService,
   updateOrderByIdService,
   deleteOrderByIdService,
   closeOrderByIdService,
};