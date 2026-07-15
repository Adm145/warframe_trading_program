require("dotenv").config();
const { getItemId } = require("../utils/item.util");
const { requireSession } = require("../utils/session.util");
const { ApiError } = require("../utils/ApiError");
const { NotFoundError, BadRequestError } = require("../utils/error.util");

const orderBaseUrl = `${process.env.WARFRAME_MARKET_API_V2}/order`;

const postNewOrderService = async (itemName, type, platinum, quantity, rank) => {
   const itemId = await getItemId(itemName);
   const { token } = requireSession();

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
      throw ApiError(response.status, detail);
   }

   const data = await response.json();
   return data;
}

const updateOrderByIdService = async (orderId, body) => {
   const { token } = requireSession();

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
      throw ApiError(response.status, detail);
   }

   const data = await response.json();
   return data;
}

const deleteOrderByIdService = async (orderId) => {
   const { token } = requireSession();

   const response = await fetch(`${orderBaseUrl}/${orderId}`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
         Authorization: token,
      },
   });

   if (!response.ok) {
      const detail = await response.text();
      throw ApiError(response.status, detail);
   }

   const data = await response.json();
   return data;
}

const closeOrderByIdService = async (orderId, quantity) => {
   const { token } = requireSession();

   if (quantity === undefined) {
      return await deleteOrderByIdService(orderId);
   }

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
      throw ApiError(ordersResponse.status, detail);
   }

   const { data: orders } = await ordersResponse.json();
   const currentOrder = orders.find((order) => order.id === orderId);

   if (!currentOrder) {
      throw NotFoundError("Order not found.");
   }

   if (quantity > currentOrder.quantity) {
      throw BadRequestError("quantity cannot exceed the order's current quantity.");
   }

   const newQuantity = currentOrder.quantity - quantity;

   if (newQuantity === 0) {
      return await deleteOrderByIdService(orderId);
   }

   const response = await fetch(`${orderBaseUrl}/${orderId}`, {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json",
         Authorization: token,
      },
      body: JSON.stringify({ quantity: newQuantity }),
   });

   if (!response.ok) {
      const detail = await response.text();
      throw ApiError(response.status, detail);
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
