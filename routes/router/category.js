const express = require("express");
const { getAllCategories, addCategory, getCategoryById, updateCategory, deleteCategory } = require("../../controller/categoryController");

const categoryRoutes = express();

categoryRoutes.get("/category", getAllCategories);
categoryRoutes.post("/category", addCategory);
categoryRoutes.get("/category/:id", getCategoryById);
categoryRoutes.put("/category/:id", updateCategory);
categoryRoutes.delete("/category/:id", deleteCategory);

module.exports = categoryRoutes;