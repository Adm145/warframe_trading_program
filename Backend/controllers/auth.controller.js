const { compareAccessKey } = require("../bcrypt/accessKey.util");
const { unlockService } = require("../services/auth.service");
const { UnauthorizedError } = require("../utils/error.util");

const unlockController = async (req, res) => {
   const { accessKey } = req.body;
   try {
      const isValid = await compareAccessKey(accessKey);

      if (!isValid) {
         throw UnauthorizedError("Invalid access key.");
      }

      await unlockService();
      res.status(200).json("200 ok success");
   } catch (err) {
      if (err.isApiError) {
         return res.status(err.status).json({ detail: err.detail });
      }
      console.log(`error: ${err}`);
      res.status(500).json({ detail: "Internal server error." });
   }
};

module.exports = {
   unlockController,
};
