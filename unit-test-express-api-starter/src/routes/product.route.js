const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

router.get("/", async (req, res) => {
    try {
  
      const products = await productController.fetchProducts();
      res.json({
        products,
        status: 200,
        message: "Products fetch successfully!",
      });
    } catch (err) {
      res.json({
        products: null,
        status: err.code || err.statusCode || 500,
        message:
          err.message || "Something went wrong while fetching products",
      });
    }
  });

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productController.fetchProduct(id);
    res.json({
      product,
      status: 200,
      message: "Product fetch successfully!",
    });
  } catch (err) {
    res.json({
      product: null,
      status: err.code || err.statusCode || 500,
      message:
        err.message || "Something went wrong while fetching product from DB!",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, rating, price } = req.body;

    const product = await productController.createProduct({
      name,
      rating,
      price,
    });

    res.json({
      product,
      status: 200,
      message: "Product created successfully!",
    });
  } catch (err) {
    res.json({
      product: null,
      status: err.code || err.statusCode || 500,
      message:
        err.message || "Something went wrong while creating new product!",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rating, price } = req.body;

    const product = await productController.updateProduct(id, {name, rating, price});
    res.json({
      product,
      status: 200,
      message: "Product updated successfully!",
    });
  } catch (err) {
    res.json({
      product: null,
      status: err.code || err.statusCode || 500,
      message:
        err.message || "Something went wrong while updating product hash!",
    });
  }
});

module.exports = router;
