const { version } = require("mongoose");

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean
    },
    { timestamps: true, versionKey: false  }
  );



  const Tutorial = mongoose.model("orders", schema);
  return Tutorial;
};
