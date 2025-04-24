const database = require("../database/connection");

class Semiotic {

  async create(semiotic) {

    try {
      await database("t_semiotica").insert({
        id_projeto: semiotic.id, 
        id_usuario: semiotic.userId, 
        nm_signo: semiotic.signo, 
        ds_recomendacoes:semiotic.recomendacaoSemiotica, 
        ds_caminho: semiotic.imagem,
        ds_esperada: semiotic.esperada,
        ds_possivel: semiotic.possivel,
        ds_quebra: semiotic.quebra
      });
      return { success: true, message: "A semiótica foi salva com sucesso!" };
    } catch (err) {
      console.error("Erro ao salvar semiótica:", err);
      throw err;
    }}
  
    async findByProject(projetoId) {
      try {
        const results = await database("t_semiotica as s")
          .select(
            "s.id_semiotica",
            "s.id_projeto", 
            "s.nm_signo", 
            "s.ds_recomendacoes", 
            "s.ds_caminho",
            "s.ds_esperada",
            "s.ds_possivel",
            "s.ds_quebra",
            "u.nm_usuario"
          )
          .join("t_usuario as u", "s.id_usuario", "u.id_usuario")
          .where({ "s.id_projeto": projetoId });
  
        return results;
      } catch (error) {
        throw error;
      }
    }

    async correct({ idSemiotica, userId, observacao }) {
      try {
        const result = await database("t_semiotica")
          .where({ id_semiotica: idSemiotica, id_usuario: userId })
          .update({
            ds_observacoes: observacao,
            st_correcao: 1
          });
  
        return result; // número de linhas atualizadas

      } catch (err) {
        console.error("Erro ao corrigir semiótica:", err);
        throw err;
      }
    }

}

module.exports = new Semiotic();