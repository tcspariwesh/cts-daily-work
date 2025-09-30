const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { productRoutes, healthCheckRoutes } = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    status: true,
  });
});

app.use("/health", healthCheckRoutes);
app.use("/product", productRoutes);

// Connect to mongoDB
let mongoDB =
  process.env.MONGODB_URL ||
  "mongodb://localhost:27017/unit-test-express-api-starter";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
});

mongoose.Promise = global.Promise;

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB Connection Failed")
);

module.exports = app;
