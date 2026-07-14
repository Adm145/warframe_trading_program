require("dotenv").config();
const { formatLocalTimestamp } = require("../utils/token.timestamp.util");
const { saveSession } = require("../utils/session.util");

//todo check if more efficient to save password and email in .env->
//todo ->and call endpoint on token expiration, instead of entering creds on frontend.
const authBaseUrl = `${process.env.WARFRAME_MARKET_API_V1}/auth/signin`;

const signInController = async (req, res) => {
    const { email, password } = req.body;
    try {
          const response = await fetch(`${authBaseUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; utf-8",
                "Accept": "application/json",
                "Authorization": "JWT",
                "platform": "pc",
                "language": "en"
            },
            body: JSON.stringify({ email, password, auth_type: "header" })
          });

          if (!response.ok) {
            const detail = await response.text();
            return res.status(response.status).json({ detail });
          }

          const data = await response.json();
          
          const ingameName = data.payload.user.ingame_name;
          const token = response.headers.get("authorization").replace("JWT", "Bearer");
          const timestamp = formatLocalTimestamp(response.headers.get("date"));
          saveSession(ingameName, token, timestamp);

          console.log("status 200 ok");
          res.json({ingameName : ingameName, token : token, timestamp : timestamp});
        
    } catch (err) {
        // res.error(err)
        console.log("error");
    }
}

module.exports = {
    signInController
}
