const path = require("path");
const { v4: uuidv4 } = require("uuid");

const subirArchivo = (
  { archivo },
  extensionValidas = ["jpg", "png", "jpeg", "git"],
  carpeta = ""
) => {
  return new Promise((resolve, regect) => {
    const nombreContador = archivo.name.split(".");
    const extension = nombreContador[nombreContador.length - 1];

    // validar extension
    if (!extensionValidas.includes(extension)) {
      return regect(`extensión ${extension} not valid ${extensionValidas}`);
    }

    const nameTemporal = uuidv4() + "." + extension;

    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      carpeta,
      nameTemporal
    );

    archivo.mv(uploadPath, (err) => {
      if (err) {
        regect(err);
      }

      resolve(nameTemporal);
    });
  });
};

module.exports = {
  subirArchivo,
};
