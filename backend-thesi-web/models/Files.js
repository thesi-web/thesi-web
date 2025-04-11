const database = require("../database/connection");

class Files {

  async findByProjectId(projetoId, userId) {

    return await database("t_projeto as P")
      .innerJoin("t_arquivos as A", "P.id_projeto", "A.id_projeto")
      .select(
        "P.id_projeto", 
        "A.id_arquivo", 
        "A.nm_arquivo", 
        "A.ds_arquivo", 
        "A.id_arquivo"
      )
      .where("A.id_usuario", userId)
      .andWhere("P.id_projeto", projetoId);
  }
}

module.exports = new Files();
  