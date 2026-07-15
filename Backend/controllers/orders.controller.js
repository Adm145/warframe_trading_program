const {
   getOrdersForItemService,
   getTopOrdersForItemService,
   getUserOrdersService,
} = require("../services/orders.service");

const getOrdersForItemController = async (req, res) => {
   const itemName = req.params.item_name;
   try {
      const data = await getOrdersForItemService(itemName);
      res.json(data);
   } catch (err) {
      if (err.isApiError) {
         return res.status(err.status).json({ detail: err.detail });
      }
      res.status(500).json({ detail: "Internal server error." });
   }
};

const getTopOrdersForItemController = async (req, res) => {
   const itemName = req.params.item_name;
   try {
      const data = await getTopOrdersForItemService(itemName);
      res.json(data);
   } catch (err) {
      if (err.isApiError) {
         return res.status(err.status).json({ detail: err.detail });
      }
      res.status(500).json({ detail: "Internal server error." });
   }
};

const getUserOrdersController = async (req, res) => {
   try {
      const data = await getUserOrdersService();
      res.json(data);
   } catch (err) {
      if (err.isApiError) {
         return res.status(err.status).json({ detail: err.detail });
      }
      res.status(500).json({ detail: "Internal server error." });
   }
};

module.exports = {
   getOrdersForItemController,
   getTopOrdersForItemController,
   getUserOrdersController,
};
