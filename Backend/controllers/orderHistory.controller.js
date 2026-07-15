const { getOrderHistoryService } = require("../services/orderHistory.service")

// GET localhost:3500/order-history/:window  (window = 24h/48h/7d/14d)
// Returns items ranked by how often they appeared in orders within that
// window: [{ itemId, itemIndex, orderCount, buyCount, sellCount, totalQuantity,
//            avgSellPrice, maxSellPrice }, ...]
// avgSellPrice/maxSellPrice are computed from sell-type orders only, and
// are null when an item has no sell orders in the window.
const getOrderHistoryController = async (req, res) => {
   try {
      const window = req.params.window;
      const results = await getOrderHistoryService(window)
      res.json(results);
   } catch (err) {
      if (err.isApiError) {
         return res.status(err.status).json({ detail: err.detail });
      }
      res.status(500).json({ detail: "Internal server error." });
   }
};

module.exports = {
   getOrderHistoryController,
};
