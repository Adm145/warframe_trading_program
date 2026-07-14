const getItemId = async (itemName) => {
   const url = `${process.env.WARFRAME_MARKET_API_V2}/items/${itemName}`;
   try {
      const response = await fetch(`${url}`);

      if (!response.ok) {
         s;
         const detail = await response.text();
         return res.status(response.status).json({ detail });
      }

      const data = await response.json();
      itemId = data.data.id;
      return itemId;
   } catch (err) {
      // res.error(err)
      console.log("error");
   }
};

module.exports = {
   getItemId,
};
