// One-off CLI helper - run manually, not imported by the app.
// Usage: node bcrypt/generateHash.js "your-chosen-access-key"
// Paste the printed hash into .env as ACCESS_KEY_HASH.
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const accessKey = process.argv[2];

if (!accessKey) {
   console.log('Usage: node bcrypt/generateHash.js "your-chosen-access-key"');
   process.exit(1);
}

bcrypt.hash(accessKey, SALT_ROUNDS).then((hash) => {
   console.log(hash);
});
