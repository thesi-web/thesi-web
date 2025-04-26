const database = require("../database/connection");

class Images {
  
  async findById(idImagem) {
    const result = await database("t_imagens")
      .select("nm_imagem", "ds_caminho")
      .where("id_imagem", idImagem);

    return result[0];
  }

  async findByProjectId(userId, projetoId) {
    return await database("t_projeto as P")
      .innerJoin("t_imagens as I", "P.id_projeto", "I.id_projeto")
      .select("P.id_projeto", "I.id_imagem", "I.ds_caminho", "I.st_avaliacao")
      .where("I.id_usuario", userId)
      .andWhere("P.id_projeto", projetoId);
  }

  async getHeuristicImage(id) {
    return await database("t_heuristica")
      .select("ds_caminho")
      .where("id_heuristica", id)
      .first();
  }

  async getSemioticImage(id) {
    return await database("t_semiotica")
      .select("ds_caminho")
      .where("id_semiotica", id)
      .first();
  }

  async evaluateImagem(idImagem) {
    return await database("t_imagens")
      .update({ st_avaliacao: 1 })
      .where("id_imagem", idImagem);
  }

}

module.exports = new Images();