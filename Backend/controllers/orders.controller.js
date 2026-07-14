const { getSession } = require("../utils/session.util");

require("dotenv").config();

const ordersBaseUrl = `${process.env.WARFRAME_MARKET_API_V2}/orders/`;

const getOrdersForItemController = async (req, res) => {
    const itemName = req.params.item_name;
    try {
          const response = await fetch(`${ordersBaseUrl}/item/${itemName}`);

          if (!response.ok) {
            const detail = await response.text();
            return res.status(response.status).json({ detail });
          }

          const data = await response.json();
          console.log("status 200 ok");
          res.json(data);
    } catch (err) {
        // res.error(err)
        console.log("error");
    }
}

const getTopOrdersForItemController = async (req, res) => {
    const itemName = req.params.item_name;
    try {
          const response = await fetch(`${ordersBaseUrl}/item/${itemName}/top`);

          if (!response.ok) {
            const detail = await response.text();
            return res.status(response.status).json({ detail });
          }

          const data = await response.json();
          console.log("status 200 ok");
          res.json(data);
    } catch (err) {
        // res.error(err)
        console.log("error");
    }
}

const getUserOrders = async (req, res) => {
    console.log("user")
    try {
          const { token } = getSession();

          const response = await fetch(`${ordersBaseUrl}/my`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            }
          });

          if (!response.ok) {
            const detail = await response.text();
            return res.status(response.status).json({ detail });
          }

          const data = await response.json();
          console.log("status 200 ok");
          console.log(data);
          res.json(data);
    } catch (err) {
        // res.error(err)
        console.log("error");
    }
}

module.exports = {
    getOrdersForItemController,
    getTopOrdersForItemController,
    getUserOrders
}