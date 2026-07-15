const fs = require("fs");
const path = require("path");
const { UnauthorizedError } = require("./error.util");

const sessionFilePath = path.join(__dirname, "..", "session.json");

const saveSession = (ingameName, token, timestamp) => {
   const session = {
      token,
      ingameName,
      timestamp,
   };
   fs.writeFileSync(sessionFilePath, JSON.stringify(session, null, 2));
};

const getSession = () => {
   if (!fs.existsSync(sessionFilePath)) {
      return null;
   }
   const raw = fs.readFileSync(sessionFilePath, "utf-8");
   const parsed = JSON.parse(raw);
   return parsed;
};

const requireSession = () => {
   const session = getSession();
   if (!session) {
      throw UnauthorizedError("No active session. Unlock first.");
   }
   return session;
};

module.exports = {
   saveSession,
   getSession,
   requireSession,
};
