const { response } = require("express");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const path = require("path");
const { subirArchivo } = require("../helpers");
const { Product, User } = require("../models");

const changeFile = async (req, res = response) => {
  try {
    const name = await subirArchivo(req.files, ["pdf", "md"], "musica");
    res.json({ name });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const updateFile = async (req, res = response) => {
  const { id, collection } = req.params;

  let modelo;

  switch (collection) {
    case "user":
      modelo = await User.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `User no  exist with ${id}` });
      }
      break;
    case "product":
      modelo = await Product.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `Product no  exist with ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Olvido validar" });
  }

  if (modelo.img) {
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      collection,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  const nombre = await subirArchivo(req.files, undefined, collection);
  modelo.img = nombre;

  await modelo.save();

  res.json({ modelo });
};
const updateFileCloudinary = async (req, res = response) => {
  const { id, collection } = req.params;

  let modelo;

  switch (collection) {
    case "user":
      modelo = await User.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `User no  exist with ${id}` });
      }
      break;
    case "product":
      modelo = await Product.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `Product no  exist with ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Olvido validar" });
  }

  if (modelo.img) {
    const nameArr = modelo.img.split("/");
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split(".");
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.archivo;

  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  modelo.img = secure_url;

  await modelo.save();

  res.json({ modelo });
};

const listImg = async (req, res = response) => {
  const { id, collection } = req.params;

  let modelo;

  switch (collection) {
    case "user":
      modelo = await User.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `User no  exist with ${id}` });
      }
      break;
    case "product":
      modelo = await Product.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `Product no  exist with ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Olvido validar" });
  }

  if (modelo.img) {
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      collection,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }

  const pathImagen = path.join(__dirname, "../assets/no-image.jpg");
  res.sendFile(pathImagen);
};

module.exports = {
  changeFile,
  updateFile,
  listImg,
  updateFileCloudinary,
};
