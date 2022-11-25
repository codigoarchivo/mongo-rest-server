const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require("../models");

const collectionPermit = ["user", "category", "product", "roles"];

const serchUser = async (term, res = response) => {
  const esMongoID = ObjectId.isValid(term);
  if (esMongoID) {
    const user = await User.findById(term);
    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(term, "i");
  const user = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ condition: true }],
  });
  res.json({
    results: user,
  });
};

const serchCategory = async (term, res = response) => {
  const esMongoID = ObjectId.isValid(term);
  if (esMongoID) {
    const category = await Category.findById(term);
    return res.json({
      results: category ? [category] : [],
    });
  }

  const regex = new RegExp(term, "i");
  const category = await Category.find({ name: regex, state: true });
  res.json({
    results: category,
  });
};

const serchProduct = async (term, res = response) => {
  const esMongoID = ObjectId.isValid(term);
  if (esMongoID) {
    const product = await Product.findById(term).populate("category", "name");
    return res.json({
      results: product ? [product] : [],
    });
  }

  const regex = new RegExp(term, "i");
  const product = await Product.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  }).populate("category", "name");
  res.json({
    results: product,
  });
};

const buscar = async (req, res = response) => {
  const { collection, term } = req.params;

  if (!collectionPermit.includes(collection)) {
    return res.status(400).json({
      msg: `collection permitidas ${collectionPermit}`,
    });
  }

  switch (collection) {
    case "user":
      await serchUser(term, res);
      break;
    case "category":
      await serchCategory(term, res);
      break;
    case "product":
      await serchProduct(term, res);
      break;

    default:
      res.status(500).json({
        msg: "Se olvido esta busqueda",
      });
  }
};

module.exports = { buscar };
