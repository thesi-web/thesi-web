require("dotenv").config();
const knex = require("knex");

const database = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DB_CONNECTION,  // URL de conexão completa
    ssl: { rejectUnauthorized: false }  // Adicionando a configuração SSL
  }
});

database.raw("SELECT 1")
  .then(() => {
    console.log("Conectado ao banco de dados com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  });

module.exports = database;
