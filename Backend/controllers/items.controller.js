require("dotenv").config();
const { getItemId } = require("../utils/item.util");


const itemsBaseUrl = `${process.env.WARFRAME_MARKET_API_V2}/items/`;

const getAllItemsController = async (req, res) => {
    try {
          const response = await fetch(`${itemsBaseUrl}`);

          if (!response.ok) {
            const detail = await response.text();
            return res.status(response.status).json({ detail });
          }

          const data = await response.json();
          console.log("status 200 ok");
          console.log(data.data[0].slug)
          res.json(data);
    } catch (err) {
        // res.error(err)
        console.log("error");
    }
}

const getItemDetails = async (req, res) => {
    const itemName = req.params.item_name;
    try {
          const response = await fetch(`${itemsBaseUrl}/${itemName}`);

          if (!response.ok) {
            const detail = await response.text();
            return res.status(response.status).json({ detail });
          }

          const data = await response.json();
          console.log("status 200 ok");
          console.log(data)
          res.json(data);
    } catch (err) {
        // res.error(err)
        console.log("error");
    }
}

const getItemStatisticsController = async (req, res) => {
    const itemName = req.params.item_name;
    try {
          const response = await fetch(`${process.env.WARFRAME_MARKET_API_V1}/items/${itemName}/statistics`);

          if (!response.ok) {
            const detail = await response.text();
            return res.status(response.status).json({ detail });
          }

          const data = await response.json();
          console.log("status 200 ok");
          console.log(data.payload.statistics_closed["48hours"]) // can read ["48hours"]/["90days"] for the matching time period
          res.json(data.payload.statistics_closed["48hours"]);
    } catch (err) {
        // res.error(err)
        console.log("error");
    }
}

module.exports = {
    getAllItemsController,
    getItemStatisticsController,
    getItemDetails
}