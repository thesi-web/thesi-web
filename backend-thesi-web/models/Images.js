const database = require("../database/connection");
const { UploadService } = require("../services/uploadService");
const uploader = new UploadService();
require("dotenv").config();

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

  async add(images, userId, projetoId) {
    try {
      await database.transaction(async (trx) => {         
        for (const image of images) {

          const uploaded = await uploader.execute(image.originalname);

          await trx("t_imagens").insert({
            id_projeto: projetoId,
            id_usuario: userId,
            nm_imagem: uploaded.filename,
            ds_caminho: uploaded.url         
          });
        }              
      });
  
    } catch (err) {
      console.error("Não foi possível adicionar a imagem ao projeto:", err);
      throw err;
    }
  }

  async delete(idImage){

    const trx = await database.transaction();
  
    try {
      await trx("t_imagens").where("id_imagem", idImage).del();
      
      await trx.commit();
      return { sucesso: true };
      
    } catch (err) {
      await trx.rollback();
      console.error("Erro ao deletar imagem:", err.message);
      throw new Error(`Erro ao deletar imagem: ${err.message}`);
    }
  }

}

module.exports = new Images();