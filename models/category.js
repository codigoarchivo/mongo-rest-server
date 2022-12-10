const { Schema, model } = require("mongoose");

const CategoryShema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  state: {
    type: Boolean,
    required: true,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

CategoryShema.methods.toJSON = function () {
  const { __v, state, ...data } = this.toObject();
  return data;
};

module.exports = model("Category", CategoryShema);
