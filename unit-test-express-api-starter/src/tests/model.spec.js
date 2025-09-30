const chai = require("chai");
const expect = chai.expect;
const mongoose = require("mongoose");
const ValidationError = mongoose.Error.ValidationError;

var Product = require("../models/Product.model");

xdescribe("Testing Product model", () => {
  let sampleProductVal;

  beforeEach(() => {
    sampleProductVal = {
      name: "sample product",
      price: "AAD",
      rating: "5",
    };
  });

  it("it should throw an error due to missing fields", async (done) => {
    let product = new Product();
    const validations = product.validateSync();
    expect(validations.errors.name).to.exist;
    expect(validations.errors.rating).to.exist;
    expect(validations.errors.price).to.exist;
    done();
  });

  it("it should throw an error due to incorrect type in price", async (done) => {
    let product = new Product(sampleProductVal);
    const validations = product.validateSync();
    expect(validations.errors.price).to.exist;
    done();
  });

  it('it should create the product successfully with correct parameters', (done) => {
    let product = new Product({
      ...sampleProductVal,
      price: 5
    });

    const validations = product.validateSync();
    expect(validations).to.be.undefined;
    expect(product.price).to.equal(5);
    done()
  });
});
