require("dotenv").config();
const { ApiError } = require("../utils/ApiError");

const itemsBaseUrl = `${process.env.WARFRAME_MARKET_API_V2}/items`;

const getAllItemsService = async () => {
   const response = await fetch(`${itemsBaseUrl}`);

      if (!response.ok) {
         const detail = await response.text();
         throw ApiError(response.status, detail);
      }

   const data = await response.json();
   return data;
}

const getItemDetailsService = async (itemName) => {
   const response = await fetch(`${itemsBaseUrl}/${itemName}`);

   if (!response.ok) {
      const detail = await response.text();
      throw ApiError(response.status, detail);
   }

   const data = await response.json();
   return data;
}

const getItemStatisticsService = async (itemName) => {
    const response = await fetch(`${process.env.WARFRAME_MARKET_API_V1}/items/${itemName}/statistics`);

   if (!response.ok) {
      const detail = await response.text();
      throw ApiError(response.status, detail);
   }

   const data = await response.json();
   return data.payload.statistics_closed["48hours"]; //also accepts ["90days"]
   }

module.exports = {
   getAllItemsService,
   getItemStatisticsService,
   getItemDetailsService
}
