require("dotenv").config();
const { formatLocalTimestamp } = require("../utils/token.timestamp.util");
const { saveSession } = require("../utils/session.util");
const { ApiError } = require("../utils/ApiError");

const authBaseUrl = `${process.env.WARFRAME_MARKET_API_V1}/auth/signin`;

const unlockService = async () => {
   const response = await fetch(`${authBaseUrl}`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json; utf-8",
         Accept: "application/json",
         Authorization: "JWT",
         platform: "pc",
         language: "en",
      },
      body: JSON.stringify({
         email: process.env.WFM_EMAIL,
         password: process.env.WFM_PASSWORD,
         auth_type: "header",
      }),
   });

   if (!response.ok) {
      const detail = await response.text();
      throw ApiError(response.status, detail);
   }

   const data = await response.json();

   const ingameName = data.payload.user.ingame_name;
   const token = response.headers.get("authorization").replace("JWT", "Bearer");
   const timestamp = await formatLocalTimestamp(response.headers.get("date"));
   saveSession(ingameName, token, timestamp);
};

module.exports = {
   unlockService,
};
