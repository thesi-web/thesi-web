const database = require("../database/connection");

class Professor {

async findProfessorByEmail(email) {
    try {
      const result = await database("t_professor")
        .where({ ds_email: email })
        .first();
  
      return result;
    } catch (err) {
      console.error("Erro ao procurar professor:", err);
      throw err;
    }
  }

}

module.exports = new Professor();