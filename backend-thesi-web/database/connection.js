require("dotenv").config();
/* 
    Inicializa o pacote dotenv para carregar automaticamente as variáveis definidas no arquivo .env, 
    tornando-as acessíveis via process.env. Essencial para separar configurações sensíveis do código-fonte principal.
*/
const knex = require("knex");

const database = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  }
});

// Testar conexão com consulta simples
database.raw("SELECT 1")
  .then(() => {
    console.log("Conectado ao banco de dados com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  });

module.exports = database;
