const bcrypt = require("bcrypt");
const { verificarToken } = require("../utils/token");

exports.redefinirSenha = async (token, novaSenha) => {
    
  const decoded = await verificarToken(token);
  const email = decoded.email;

  const hashedPassword = await bcrypt.hash(novaSenha, 10);

  const atualizado = await database("t_usuario")
    .where({ ds_email: email })
    .update({ ds_senha: hashedPassword });

  if (atualizado === 0) {
    throw new Error("Usuário não encontrado.");
  }

  return { message: "Senha redefinida com sucesso!" };
};