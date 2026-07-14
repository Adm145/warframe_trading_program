const getOrdersForItemController = async (req, res) => {
   const itemName = req.params.item_name;
   try {
      const data = await getOrdersForItemService(itemName);
      res.json(data);
   } catch (err) {
      // res.error(err)
      console.log("error");
   }
};

const getTopOrdersForItemController = async (req, res) => {
   const itemName = req.params.item_name;
   try {
     const data = getTopOrdersForItemService(itemName);
      res.json(data);
   } catch (err) {
      // res.error(err)
      console.log("error");
   }
};

const getUserOrdersController = async (req, res) => {
   try {
      const data = getUserOrdersService()
      res.json(data);
   } catch (err) {
      // res.error(err)
      console.log("error");
   }
};

module.exports = {
   getOrdersForItemController,
   getTopOrdersForItemController,
   getUserOrdersController,
};
