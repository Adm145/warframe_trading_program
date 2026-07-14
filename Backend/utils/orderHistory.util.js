const fs = require("fs");
const path = require("path");

const ordersDir = path.join(__dirname, "..", "data", "orders");
const RETENTION_DAYS = 14;

const ensureOrdersDir = () => {
   if (!fs.existsSync(ordersDir)) {
      fs.mkdirSync(ordersDir, { recursive: true });
   }
};

const getFilePathForDate = (date) => {
   const dateStr = date.toISOString().slice(0, 10); // YYYY-MM-DD
   return path.join(ordersDir, `orders-${dateStr}.csv`);
};

const appendOrderRecord = (record) => {
   ensureOrdersDir();
   const { timestamp, itemIndex, type, platinum, quantity, rank } = record;
   const filePath = getFilePathForDate(new Date(timestamp));

   if (!fs.existsSync(filePath)) {
      fs.writeFileSync(
         filePath,
         "timestamp,itemIndex,type,platinum,quantity,rank\n",
      );
   }

   const rankValue = rank === undefined || rank === null ? "" : rank;
   fs.appendFileSync(
      filePath,
      `${timestamp},${itemIndex},${type},${platinum},${quantity},${rankValue}\n`,
   );
};

const pruneOldFiles = () => {
   ensureOrdersDir();
   const cutoff = Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000;

   fs.readdirSync(ordersDir).forEach((file) => {
      const match = file.match(/^orders-(\d{4}-\d{2}-\d{2})\.csv$/);
      if (!match) return;

      const fileDate = new Date(match[1]).getTime();
      if (fileDate < cutoff) {
         fs.unlinkSync(path.join(ordersDir, file));
      }
   });
};

module.exports = {
   appendOrderRecord,
   pruneOldFiles,
};
