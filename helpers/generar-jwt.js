const jwt = require("jsonwebtoken");

const generarJWT = (uid = "") => {
  return new Promise((resolve, regect) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) {
          console.log(err);
          regect("Token error");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generarJWT };
