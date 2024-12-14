const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../../controller/userController");

const userRoutes = express();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser);

module.exports = userRoutes;