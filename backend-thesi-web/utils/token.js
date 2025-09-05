require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const database = require("../database/connection");
const secret = process.env.JWT_SECRET;
const { enviarEmailToken } = require("../utils/email");

exports.secret = secret;

// -- LOGIN DE USUÁRIO

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

// -- CRIAÇÃO DE CONTA

// Gera e salva token no banco
exports.gerarToken = async (email) => {
  const token = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedToken = await bcrypt.hash(token, 10);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  // Atualiza usuário com token e expiração
    await database("t_usuario_token")
    .insert({
      ds_email: email,
      nr_token: hashedToken,
      token_expires_at: expiresAt,
    })
    .onConflict("ds_email") // se já existir, atualiza
    .merge({
      nr_token: hashedToken,
      token_expires_at: expiresAt,
      created_at: database.fn.now(),
    });

    // Envia o token por e-mail
    await enviarEmailToken(email, token);

    return { message: "Token enviado com sucesso." };
};

// Valida token recebido
exports.validarToken =  async (email, tokenEnviado) => {
  const tokenData = await database("t_usuario_token")
  .where({ ds_email: email })
  .first();

  if (!tokenData) return false;
  if (new Date() > tokenData.token_expires_at) return false;

  const match = await bcrypt.compare(tokenEnviado, tokenData.nr_token);
  if (!match) return false;

  // se bateu → invalida token
  await database("t_usuario_token")
    .where({ ds_email: email })
    .delete();

  return true;
}


