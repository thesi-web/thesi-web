const database = require("../database/connection");

class Notifications {

  async create(userId, projetoId, link, mensagem = 'Seu projeto foi corrigido!') {

    try {
      
      await database("t_notificacao").insert({
        id_usuario: userId,
        id_projeto: projetoId,
        ds_link: link,
        ds_mensagem: mensagem
      });
      return { success: true, message: "Notificação criado com sucesso!" };
    } catch (err) {
      console.error("Erro ao criar nofificação:", err);
      throw err;
    }

  }

  async markAsRead(userId, projetoId) {
    return await database("t_projeto_usuario")
      .where({ id_usuario: userId, id_projeto: projetoId })
      .update({ ds_lida: true });
  }

  async findByUserId(userId) {
    try {
      const results = await database("t_notificacao as n")
        .select(
          "n.ds_mensagem",
          "n.ds_link", 
          "pr.nm_professor",
          "p.nm_projeto",
          "u.nm_usuario"
        )
        .join("t_projeto as p", "p.id_projeto", "n.id_projeto")
        .join("t_projeto_usuario as pu", "p.id_projeto", "pu.id_projeto")
        .join("t_usuario as u", "pu.id_usuario", "u.id_usuario")
        .join("t_professor as pr", "p.id_professor", "pr.id_professor")
        .where({ "n.id_usuario": userId });

      return results;
    } catch (error) {
      throw error;
    }
  }
  

}

module.exports = new Notifications();