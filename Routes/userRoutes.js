const express = require("express");
const {registerUser,authUser} = require("../Controllers/userController");
const { orders, verify } = require("../Controllers/paymentControllers");
const Router = express.Router();

Router.post("/",registerUser);
Router.post("/login",authUser);
Router.post("/orders",orders);
Router.post("/verify",verify);

module.exports = Router