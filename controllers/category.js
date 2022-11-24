const { response } = require("express");
const { Category } = require("../models");

const createCategory = async (req, res = response) => {
  const name = req.body.name;

  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoria ${categoryDB.name} ya existe`,
    });
  }

  const data = {
    name,
    user: req.user._id,
  };

  const category = new Category(data);

  await category.save();

  res.status(201).json(category);
};

const listCategory = async (req, res = response) => {
  const { limit = 5, since = 0 } = req.query;

  const query = { condition: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate("user", "name")
      .skip(Number(since))
      .limit(Number(limit)),
  ]);

  res.json({ total, categories });
};

const listIdCategory = async (req, res = response) => {
  const { id } = req.params;

  const category = await Category.findById(id).populate("user", "name");

  res.json({ category });
};

const updateCategory = async (req, res = response) => {
  const { id } = req.params;
  const data = req.body;
  data.name = data.name.toUpperCase();

  const category = await Category.findByIdAndUpdate(id, data, { new: true });

  res.json(category);
};

const deleteCategory = async (req, res = response) => {
  const { id } = req.params;

  const categoryDelete = await Category.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json(categoryDelete);
};

module.exports = {
  createCategory,
  listCategory,
  listIdCategory,
  updateCategory,
  deleteCategory,
};
