const database = require("../database/connection");
const bcrypt = require("bcrypt");

class User {

  async create(user) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await database("t_usuario").insert({
        nr_telefone: user.phone,
        nm_usuario: user.name,
        ds_email: user.email,
        ds_senha: hashedPassword,
      });
      return { success: true, message: "Usuário criado com sucesso!" };
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      throw err;
    }
  }

  async findByEmail(email) {
    try {
      const result = await database("t_usuario")
      .where({ ds_email: email })
      .first();
      
      return result;
    } catch (err) {
        console.error("Erro ao procurar o email solicitado", err);
        throw err;
    }
  }

  async findById(id) {
    try {
        const result = await database("t_usuario")
            .select("id_usuario", "nr_telefone", "nm_usuario", "ds_email")
            .where({ id_usuario: id })
            .first();
        return result;
    }
    catch (err) {
        console.error("Usuário não encontrado", err);
        throw err;
    }
  }

  async findById(id) {
    try {
      const result = await database("t_usuario")
        .select("id_usuario", "nr_telefone", "nm_usuario", "ds_email")
        .where({ id_usuario: id })
        .first();
      return result;
    } catch (err) {
      console.error("Usuário não encontrado", err);
      throw err;
    }
  }

  async requestPassword(req, res) {

    const { email } = req.body;

    try {
      const result = await userService.enviarRecuperacao(email);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.message === "E-mail não encontrado." ? 404 : 500).json({ error: error.message });
    }

  }

}

module.exports = new User();




