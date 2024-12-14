const express = require("express");
const { getRoles } = require("../../controller/roleController");

const roleRoutes = express();

roleRoutes.get("/role", getRoles);

module.exports = roleRoutes;