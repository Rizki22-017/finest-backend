const express = require("express");
const { createOrder } = require("../../controller/orderController");

const orderRoutes = express();

orderRoutes.post("/order", createOrder);

module.exports = orderRoutes;