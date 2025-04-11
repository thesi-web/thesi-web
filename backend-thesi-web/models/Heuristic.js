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
  
    async findByProject(userId, projetoId) {
      try {
        const results = await database("t_heuristica")
          .select("id_heuristica", "id_projeto", "nm_heuristica", "ds_problemas", "ds_observacoes", "ds_recomendacoes", "nr_severidade", "st_correcao")
          .where({ id_usuario: userId, id_projeto: projetoId });
  
        return results;
      } catch (error) {
        throw error;
      }
    }

    async correct({ idHeuristica, userId, observacao }) {
      try {
        const result = await database("t_heuristica")
          .where({ id_heuristica: idHeuristica, id_usuario: userId })
          .update({
            ds_observacoes: observacao,
            st_correcao: 1
          });
  
        return result; // número de linhas atualizadas

      } catch (err) {
        console.error("Erro ao corrigir heurística:", err);
        throw err;
      }
    }

}

module.exports = new Heuristic();