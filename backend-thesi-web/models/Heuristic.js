const database = require("../database/connection");

class Heuristic {

  async create(heuristic) {

    try {
      await database("t_heuristica").insert({
        id_projeto: heuristic.id, 
        id_usuario: heuristic.userId, 
        nm_heuristica: heuristic.heuristica, 
        ds_problemas:heuristic.anotacao, 
        ds_recomendacoes:heuristic.recomendacao, 
        nr_severidade: heuristic.severidade, 
        ds_caminho: heuristic.imagem
      });
      return { success: true, message: "A heurística foi salva com sucesso!" };
    } catch (err) {
      console.error("Erro ao salvar heurística:", err);
      throw err;
    }}
  
  async findByProject(projetoId) {
    try {
      const results = await database("t_heuristica as h")
      .select(
        "h.id_heuristica",
        "h.id_projeto",
        "h.nm_heuristica",
        "h.ds_problemas",
        "h.ds_recomendacoes",
        "h.nr_severidade",
        "h.st_correcao",
        "h.ds_caminho",
        "u.nm_usuario"
      )
      .join("t_usuario as u", "h.id_usuario", "u.id_usuario")
      .where({ "h.id_projeto": projetoId });

      return results;
    } catch (error) {
      throw error;
    }
  }

  async correctHeuristic({ idHeuristica }) {
    try {
      const result = await database("t_heuristica")
        .where({ id_heuristica: idHeuristica })
        .update({
          st_correcao: true
        });

      return result;

    } catch (err) {
      console.error("Erro ao corrigir heurística:", err);
      throw err;
    }
  }

  async deleteById(idHeuristica){

    const trx = await database.transaction();
  
    try {
      await trx("t_heuristica").where("id_heuristica", idHeuristica).del();
      
      await trx.commit();
      return { sucesso: true };
      
    } catch (err) {
      await trx.rollback();
      console.error("Erro ao deletar marcação heurística:", err.message);
      throw new Error(`Erro ao deletar marcação heurística: ${err.message}`);
    }
  }

}

module.exports = new Heuristic();