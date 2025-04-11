const User = require("../models/User");
const { gerarTokenRecuperacao } = require("../utils/token");
const { enviarEmailRecuperacao } = require("../utils/email");

exports.enviarRecuperacao = async (email) => {
  const usuario = await User.findByEmail(email);

  if (!usuario) {
    throw new Error("E-mail não encontrado.");
  }

  const token = gerarTokenRecuperacao(email);
  await enviarEmailRecuperacao(email, usuario.nm_usuario, token);

  return { message: "E-mail de recuperação enviado com sucesso!" };
};
