const Files = require("../models/Files");
const Project = require("../models/Project");

class FilesController {

    async getByProjectId(req, res) {
        try {

            const userId = req.userId;
            
            const { projetoId } = req.params;

            const files = await Files.findByProjectId(projetoId, userId);
            res.json(files);

        } catch(err) {
            console.error("Erro ao buscar os arquivos projeto:", err);
            res.status(500).json({ erro: "Erro ao buscar os arquivos do projetos" });
        }
    } 
}

module.exports = new FilesController();