const database = require("../database/connection");

class Notifications {

  async getByUserId(userId) {

    return await database("t_projeto as P")
    .innerJoin("t_projeto_usuario as PU", "P.id_projeto", "PU.id_projeto")
    .innerJoin("t_usuario as U", "PU.id_usuario", "U.id_usuario")
    .select(
      "P.id_projeto", 
      "P.nm_projeto", 
      "P.dt_entrega", 
      "P.nm_autores", 
      "PU.ds_lida", 
      "U.id_usuario", 
      "U.nm_usuario"
    )
    .where("PU.id_usuario", userId)
    .orderBy("P.dt_criacao", "desc")
  }

  async markAsRead(userId, projetoId) {
    return await database("t_projeto_usuario")
      .where({ id_usuario: userId, id_projeto: projetoId })
      .update({ ds_lida: true });
  }
  

}

module.exports = new Notifications();