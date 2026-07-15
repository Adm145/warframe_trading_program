const {
    getAllItemsService,
    getItemStatisticsService,
    getItemDetailsService
} = require("../services/items.service");


const getAllItemsController = async (req, res) => {
   try {
      const data = await getAllItemsService();
      res.json(data);
   } catch (err) {
      if (err.isApiError) {
         return res.status(err.status).json({ detail: err.detail });
      }
      res.status(500).json({ detail: "Internal server error." });
   }
}

const getItemDetailsController = async (req, res) => {
   const itemName = req.params.item_name;
   try {
      const data = await getItemDetailsService(itemName);
      res.json(data);
   } catch (err) {
      if (err.isApiError) {
         return res.status(err.status).json({ detail: err.detail });
      }
      res.status(500).json({ detail: "Internal server error." });
   }
}

const getItemStatisticsController = async (req, res) => {
    const itemName = req.params.item_name;
    try {
     const data = await getItemStatisticsService(itemName)
      res.json(data);
   } catch (err) {
      if (err.isApiError) {
         return res.status(err.status).json({ detail: err.detail });
      }
      res.status(500).json({ detail: "Internal server error." });
   }
}

module.exports = {
   getAllItemsController,
   getItemStatisticsController,
   getItemDetailsController
}
