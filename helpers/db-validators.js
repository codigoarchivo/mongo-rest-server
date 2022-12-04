const { User, Category, Role, Product } = require("../models");

const isRolValid = async (rol = "") => {
  const existRol = await Role.findOne({ rol });

  if (!existRol) {
    throw new Error(`El rol ${rol} no esta registrado`);
  }
};

const emailExist = async (email = "") => {
  const existEmail = await User.findOne({ email });

  if (existEmail) {
    throw new Error(`El email: ${email} ya esta registrado`);
  }
};

const existUserById = async (id) => {
  const existUser = await User.findById(id);

  if (!existUser) {
    throw new Error(`El user con: ${id} no esta registrado`);
  }
};

const existCategoryById = async (id) => {
  const existCategory = await Category.findById(id);

  if (!existCategory) {
    throw new Error(`El id: ${id} no esta registrado`);
  }
};
const existProductById = async (id) => {
  const existProduct = await Product.findById(id);

  if (!existProduct) {
    throw new Error(`El id: ${id} no esta registrado`);
  }
};
const collectionPermt = (collection = "", collectiones = []) => {
  const incluida = collectiones.includes(collection);
  if (!incluida) {
    throw new Error(`Colletion ${incluida} not permit, ${collectiones}`);
  }

  return true;
};

module.exports = {
  isRolValid,
  emailExist,
  existUserById,
  existCategoryById,
  existProductById,
  collectionPermt,
};
