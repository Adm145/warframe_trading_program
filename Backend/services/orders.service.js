require("dotenv").config();
const { getSession } = require("../utils/session.util");

const ordersBaseUrl = `${process.env.WARFRAME_MARKET_API_V2}/orders/`;

const getOrdersForItemService = async (itemName) => {
   const response = await fetch(`${ordersBaseUrl}/item/${itemName}`);

   if (!response.ok) {
      const detail = await response.text();
      return res.status(response.status).json({ detail });
   }

   const data = await response.json();
   return data;
}

const getTopOrdersForItemService = async (itemName) => {
    const data = getTopOrdersForItemService(itemName)
   const response = await fetch(`${ordersBaseUrl}/item/${itemName}/top`);

   if (!response.ok) {
      const detail = await response.text();
      return res.status(response.status).json({ detail });
   }

   const data = await response.json();
   return data;
}

const getUserOrdersService = async () => {
   const { token } = getSession();

   const response = await fetch(`${ordersBaseUrl}/my`, {
      method: "GET",
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

module.exports = {
   getOrdersForItemService,
   getTopOrdersForItemService,
   getUserOrdersService,
}