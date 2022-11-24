const { response } = require("express");
const { Product } = require("../models");

const createProduct = async (req, res = response) => {
  const { state, user, ...body } = req.body;

  const productDB = await Product.findOne({ name: body.name });

  if (productDB) {
    return res.status(400).json({
      msg: `El product ${productDB.name}, ya existe`,
    });
  }

  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.user._id,
  };

  const product = new Product(data);

  await product.save();

  res.status(201).json(product);
};

const listProduct = async (req, res = response) => {
  const { limit = 5, since = 0 } = req.query;

  const query = { condition: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("user", "name")
      .populate("category", "name")
      .skip(Number(since))
      .limit(Number(limit)),
  ]);

  res.json({ total, products });
};

const listIdProduct = async (req, res = response) => {
  const { id } = req.params;

  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  res.json({ product });
};

const updateProduct = async (req, res = response) => {
  const { id } = req.params;
  const data = req.body;
  if (data) {
    data.name = data.name.toUpperCase();
  }

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json(product);
};

const deleteProduct = async (req, res = response) => {
  const { id } = req.params;

  const productDelete = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json(productDelete);
};

module.exports = {
  createProduct,
  listProduct,
  listIdProduct,
  updateProduct,
  deleteProduct,
};
