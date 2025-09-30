const Product = require("../models/Product.model");

exports.createProduct = async function (productObj) {
  try {
    if (
      !productObj ||
      !productObj.name ||
      !productObj.rating ||
      !productObj.price
    ) {
      throw new Error("Invalid arguments");
    }
    const { name, rating, price } = productObj;

    let product = new Product({
      name,
      rating,
      price,
    });

    return await product.save();
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.updateProduct = async function (id, productObj) {
  try {
    if (!id) {
      throw new Error('Incomplete arguments');
    }
    let product = await Product.updateOne(
      {
        _id: id,
      },
      { $set: productObj }
    );

    return product;
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.fetchProduct = async function (id) {
  try {
    if (!id) {
      throw new Error("Invalid product id");
    }
    return await Product.findOne({
      _id: id,
    });
  } catch (err) {
    return Promise.reject(err);
  }
};
exports.fetchProducts = async function () {
  try {
    return await Product.find();
  } catch (err) {
    return Promise.reject(err);
  }
};
