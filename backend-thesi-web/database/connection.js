require("dotenv").config();
const knex = require("knex");


/*
-- Conectar com o banco de dados virtual (Render)

const database = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DB_CONNECTION,  // URL de conexão completa
    ssl: { rejectUnauthorized: false }  // Adicionando a configuração SSL
  }
});
*/

// -- Conectar com o banco de dados físico (Local)
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
