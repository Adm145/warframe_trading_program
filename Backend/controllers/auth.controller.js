const { compareAccessKey } = require("../bcrypt/accessKey.util");
const { unlockService } = require("../services/auth.service");

const unlockController = async (req, res) => {
   const { accessKey } = req.body;
   try {
      const isValid = await compareAccessKey(accessKey);

      if (!isValid) {
         return res.status(401).json({ detail: "Invalid access key." });
      }

      unlockService();
      res.status(200).json("200 ok success");
   } catch (err) {
      // res.error(err)
      console.log(`error: ${err}`);
   }
};

module.exports = {
   unlockController,
};
