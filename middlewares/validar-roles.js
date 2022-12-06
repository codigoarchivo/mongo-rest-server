const { response } = require("express");

const esAdminRole = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Required verify role, it´s not valid primary token",
    });
  }

  const { rol, name } = req.user;

  if (![rol].includes("ADMIN_ROLE")) {
    return res.status(401).json({
      msg: `${name} is not administrator - not cotinue`,
    });
  }

  next();
};

const haveRol = (...roles) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Required verify role, it´s not valid primary token",
      });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(401).json({
        msg: `service requires some of these ${roles}`,
      });
    }

    next();
  };
};
module.exports = { esAdminRole, haveRol };
