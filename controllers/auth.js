const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    // password is not required
    if (!user) {
      return res.status(400).json({
        msg: "User / Password not correct - email",
      });
    }
    // user active
    if (!user.condition) {
      return res.status(400).json({
        msg: "User / Password not correct - condition",
      });
    }
    // password veryfid
    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "User / Password not correct - password",
      });
    }

    // Generate JWT
    const token = await generarJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error del servidor",
    });
  }
};

const googleSingIn = async (req, res = response) => {
  const { id_token } = req.body;
  try {
    const { name, picture: img, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });
    // password is not required
    if (!user) {
      user = new User({
        name,
        img,
        email,
        google: true,
      });

      await user.save();
    }

    if (!user.condition) {
      res.status(401).json({
        msg: "User Bloking",
      });
    }

    // Generate JWT
    const token = await generarJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Not verify token",
    });
  }
};

module.exports = { login, googleSingIn };
