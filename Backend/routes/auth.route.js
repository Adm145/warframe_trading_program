const express = require('express');
const route = express.Router();
const {
    signInController
} = require('../controllers/auth.controller');

route.post('/signin', signInController); // post -> localhost:3500/auth/signin

module.exports = route;
