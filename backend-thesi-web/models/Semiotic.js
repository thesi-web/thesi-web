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

  async correctSemiotic({ idSemiotica }) {
    try {
      const result = await database("t_semiotica")
        .where({ id_semiotica: idSemiotica })
        .update({
          st_correcao: true
        });

      return result;

    } catch (err) {
      console.error("Erro ao corrigir semiótica:", err);
      throw err;
    }
  }

  async deleteById(idSemiotica){

    const trx = await database.transaction();
  
    try {
      await trx("t_semiotica").where("id_semiotica", idSemiotica).del();
      
      await trx.commit();
      return { sucesso: true };
      
    } catch (err) {
      await trx.rollback();
      console.error("Erro ao deletar marcação semiotica:", err.message);
      throw new Error(`Erro ao deletar marcação semiotica: ${err.message}`);
    }
  }

}

module.exports = new Semiotic();