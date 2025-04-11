require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

exports.secret = secret;

exports.gerarTokenRecuperacao = (email) => {
  return jwt.sign({ email }, secret, { expiresIn: "1h" });
};

exports.verificarToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject(new Error("Token inválido ou expirado."));
      }
      resolve(decoded);
    });
  });
};
