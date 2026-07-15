require("dotenv").config();
const { requireSession } = require("../utils/session.util");
const { ApiError } = require("../utils/ApiError");

const ordersBaseUrl = `${process.env.WARFRAME_MARKET_API_V2}/orders`;

const getOrdersForItemService = async (itemName) => {
   const response = await fetch(`${ordersBaseUrl}/item/${itemName}`);

   if (!response.ok) {
      const detail = await response.text();
      throw ApiError(response.status, detail);
   }

   const data = await response.json();
   return data;
}

const getTopOrdersForItemService = async (itemName) => {
   const response = await fetch(`${ordersBaseUrl}/item/${itemName}/top`);

   if (!response.ok) {
      const detail = await response.text();
      throw ApiError(response.status, detail);
   }

   const data = await response.json();
   return data;
}

const getUserOrdersService = async () => {
   const { token } = requireSession();

   const response = await fetch(`${ordersBaseUrl}/my`, {
      method: "GET",
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

module.exports = {
   getOrdersForItemService,
   getTopOrdersForItemService,
   getUserOrdersService,
}
