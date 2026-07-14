const fs = require("fs");
const path = require("path");
const { resolveItemId } = require("../utils/itemIndex.util");

const ordersDir = path.join(__dirname, "..", "data", "orders");

const WINDOW_MS = {
   "24h": 24 * 60 * 60 * 1000,
   "48h": 48 * 60 * 60 * 1000,
   "7d": 7 * 24 * 60 * 60 * 1000,
   "14d": 14 * 24 * 60 * 60 * 1000,
};

const getOrderHistoryService = async (window) => {
   const windowMs = WINDOW_MS[window];
   if (!windowMs) {
      return res.status(400).json({
         detail: `Invalid window. Use one of: ${Object.keys(WINDOW_MS).join(", ")}`,
      });
   }

   if (!fs.existsSync(ordersDir)) {
      return res.json([]);
   }

   const cutoff = Date.now() - windowMs;
   const itemStats = new Map();

   const files = fs
      .readdirSync(ordersDir)
      .filter((f) => /^orders-\d{4}-\d{2}-\d{2}\.csv$/.test(f));

   files.forEach((file) => {
      const lines = fs
         .readFileSync(path.join(ordersDir, file), "utf-8")
         .split("\n")
         .filter(Boolean);
      lines.slice(1).forEach((line) => {
         const [timestamp, itemIndex, type, platinum, quantity] =
            line.split(",");
         const ts = Number(timestamp);
         if (ts < cutoff) return;

         if (!itemStats.has(itemIndex)) {
            itemStats.set(itemIndex, {
               itemIndex: Number(itemIndex),
               orderCount: 0,
               buyCount: 0,
               sellCount: 0,
               totalQuantity: 0,
               sellPlatinumSum: 0,
               maxSellPrice: 0,
            });
         }

         const stats = itemStats.get(itemIndex);
         stats.orderCount++;
         stats.totalQuantity += Number(quantity);

         if (type === "buy") {
            stats.buyCount++;
         }
         if (type === "sell") {
            const plat = Number(platinum);
            stats.sellCount++;
            stats.sellPlatinumSum += plat;
            if (plat > stats.maxSellPrice) stats.maxSellPrice = plat;
         }
      });
   });

   const results = [...itemStats.values()]
      .map(({ sellPlatinumSum, ...stats }) => ({
         itemId: resolveItemId(stats.itemIndex),
         ...stats,
         avgSellPrice:
            stats.sellCount > 0
               ? Math.round((sellPlatinumSum / stats.sellCount) * 100) / 100
               : null,
         maxSellPrice: stats.sellCount > 0 ? stats.maxSellPrice : null,
      }))
      .sort((a, b) => b.orderCount - a.orderCount);
   return results;
}

module.exports = {
   getOrderHistoryService
}