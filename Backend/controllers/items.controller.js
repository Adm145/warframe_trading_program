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
      // res.error(err)
      console.log("error");
   }
}

const getItemDetailsController = async (req, res) => {
   const itemName = req.params.item_name;
   try {
      const data = await getItemDetailsService(itemName);
      res.json(data);
   } catch (err) {
      // res.error(err)
      console.log("error");
   }
}

const getItemStatisticsController = async (req, res) => {
    const itemName = req.params.item_name;
    try {
     const data = await getItemStatisticsService(itemName)
      res.json(data);
   } catch (err) {
      // res.error(err)
      console.log("error");
   }
}

module.exports = {
   getAllItemsController,
   getItemStatisticsController,
   getItemDetailsController
}