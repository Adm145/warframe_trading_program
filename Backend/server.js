require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3500;
//todo implement res.error() on endpoint calls, atm only logs

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(`/orders`, require('./routes/orders.route')); //public item orders
app.use(`/items`, require('./routes/items.route')); //public item data
app.use(`/auth`, require('./routes/auth.route')); //authentication
app.use(`/order`, require('./routes/order.route')); //user order REST (auth required)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
