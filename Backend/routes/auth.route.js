const express = require("express");
const route = express.Router();
const { unlockController } = require("../controllers/auth.controller");

route.post("/unlock", unlockController); // post -> localhost:3500/auth/unlock

module.exports = route;
