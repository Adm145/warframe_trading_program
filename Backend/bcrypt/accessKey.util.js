require("dotenv").config();
const bcrypt = require("bcrypt");

const compareAccessKey = async (accessKey) => {
   return bcrypt.compare(accessKey, process.env.ACCESS_KEY_HASH);
};

module.exports = {
   compareAccessKey,
};
