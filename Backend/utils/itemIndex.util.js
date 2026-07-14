const fs = require("fs");
const path = require("path");

const indexFilePath = path.join(__dirname, "..", "data", "items_index.csv");

let itemToIndex = null;
let indexToItem = null;
let nextIndex = 0;

const loadIndex = () => {
   itemToIndex = new Map();
   indexToItem = new Map();
   nextIndex = 0;

   if (!fs.existsSync(indexFilePath)) {
      fs.mkdirSync(path.dirname(indexFilePath), { recursive: true });
      fs.writeFileSync(indexFilePath, "index,itemId\n");
      return;
   }

   const lines = fs
      .readFileSync(indexFilePath, "utf-8")
      .split("\n")
      .filter(Boolean);
   lines.slice(1).forEach((line) => {
      const [index, itemId] = line.split(",");
      itemToIndex.set(itemId, Number(index));
      indexToItem.set(Number(index), itemId);
      nextIndex = Math.max(nextIndex, Number(index) + 1);
   });
};

const getOrCreateIndex = (itemId) => {
   if (itemToIndex === null) {
      loadIndex();
   }

   if (itemToIndex.has(itemId)) {
      return itemToIndex.get(itemId);
   }

   const index = nextIndex++;
   itemToIndex.set(itemId, index);
   indexToItem.set(index, itemId);
   fs.appendFileSync(indexFilePath, `${index},${itemId}\n`);
   return index;
};

//takes item index from order history and returnes an API recognized itemId value
const resolveItemId = (index) => {
   if (indexToItem === null) {
      loadIndex();
   }
   return indexToItem.get(Number(index));
};

module.exports = {
   getOrCreateIndex,
   resolveItemId,
};
