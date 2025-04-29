const database = require("../database/connection");

class Notifications {

  async create(userId, projetoId, link, mensagem = 'Your project has been corrected') {

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
  

}

module.exports = new Notifications();