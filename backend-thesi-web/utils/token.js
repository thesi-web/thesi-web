require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const { enviarEmailToken } = require("../utils/email");

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

const tokensPendentes = new Map(); // No lugar disso, use um banco ou Redis se for produção

exports.gerarToken = async (email) => {
  const token = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // expira em 10 minutos

  tokensPendentes.set(email, { token, expiresAt });

  await enviarEmailToken(email, token); // dispara aqui

  return { message: 'Token enviado com sucesso.' };
};

exports.validarToken = (email, tokenEnviado) => {
  const info = tokensPendentes.get(email);
  if (!info) return false;

  const { token, expiresAt } = info;
  if (Date.now() > expiresAt) {
    tokensPendentes.delete(email);
    return false;
  }

  return token === tokenEnviado;
};

