const express = require("express");
const categoryRoutes = require ("./router/category");
const productRoutes = require("./router/product");
const roleRoutes = require("./router/role");
const userRoutes = require("./router/user");

const Router = express();
const api = "/api/v1";

Router.use(
    api, 
    categoryRoutes, 
    productRoutes,
    roleRoutes,
    userRoutes,
);

module.exports = Router;