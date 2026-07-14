require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { getOrCreateIndex } = require("./itemIndex.util");
const { appendOrderRecord, pruneOldFiles } = require("./orderHistory.util");

const POLL_INTERVAL_MS = 4 * 60 * 1000; // 4 minutes - safely under the ~5 minute window /orders/recent covers
const stateFilePath = path.join(__dirname, "..", "data", "lastPoll.json");

const getLastSeenTimestamp = () => {
   if (!fs.existsSync(stateFilePath)) {
      return 0;
   }
   const raw = fs.readFileSync(stateFilePath, "utf-8");
   return JSON.parse(raw).lastTimestamp || 0;
};

const saveLastSeenTimestamp = (timestamp) => {
   fs.mkdirSync(path.dirname(stateFilePath), { recursive: true });
   fs.writeFileSync(
      stateFilePath,
      JSON.stringify({ lastTimestamp: timestamp }),
   );
};

const pollOnce = async () => {
   try {
      const response = await fetch(
         `${process.env.WARFRAME_MARKET_API_V2}/orders/recent`,
      );

      if (!response.ok) {
         console.log(
            "orderHistoryPoller: failed to fetch recent orders",
            response.status,
         );
         return;
      }

      const { data: orders } = await response.json();
      const lastSeen = getLastSeenTimestamp();

      let newestTimestamp = lastSeen;
      let newCount = 0;

      orders.forEach((order) => {
         const orderTime = new Date(order.createdAt).getTime();
         if (orderTime <= lastSeen) return;

         const itemIndex = getOrCreateIndex(order.itemId);
         appendOrderRecord({
            timestamp: orderTime,
            itemIndex,
            type: order.type,
            platinum: order.platinum,
            quantity: order.quantity,
            rank: order.rank,
         });
         newCount++;

         if (orderTime > newestTimestamp) {
            newestTimestamp = orderTime;
         }
      });

      saveLastSeenTimestamp(newestTimestamp);
      pruneOldFiles();
      console.log(
         `orderHistoryPoller: polled ${orders.length} recent orders, ${newCount} new`,
      );
   } catch (err) {
      console.log("orderHistoryPoller: error", err);
   }
};

const start = () => {
   pollOnce();
   setInterval(pollOnce, POLL_INTERVAL_MS);
};

module.exports = {
   start,
};
