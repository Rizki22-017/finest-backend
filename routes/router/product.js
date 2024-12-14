const express = require("express");
const { addProduct, updateProduct, getAllProducts, getProductById, deleteProduct } = require("../../controller/productController");

const productRoutes = express();

productRoutes.post("/product", addProduct);
productRoutes.put("/product/:id", updateProduct);
productRoutes.get("/product", getAllProducts);
productRoutes.get("/product/:id", getProductById);
productRoutes.delete("/product/:id", deleteProduct);

module.exports = productRoutes;