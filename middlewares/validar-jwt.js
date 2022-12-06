const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  try {
    if (!token) {
      return res.status(401).json({
        msg: "Not token",
      });
    }

    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await User.findById(uid);

    // verify conditional
    if (!user) {
      res.status(401).json({
        msg: "Not valid token - user is not exits",
      });
    }

    // verify conditional
    if (!user.condition) {
      res.status(401).json({
        msg: "Not valid token - false",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Not valid token",
    });
  }
};

module.exports = { validarJWT };
