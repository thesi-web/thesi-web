require("dotenv").config();
// Importa o framework Express
const express = require('express')
// Cria uma instância do aplicativo Express
const app = express()

const userRoutes = require("../routes/routes")

const session = require('express-session');

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoutes); // isso define o prefixo das rotas

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Importa os middlewares de erro
const notFoundHandler = require('../middlewares/notFound')
const errorHandler = require('../middlewares/errorHandler')

// Define a porta do servidor, utilizando a variável de ambiente PORT ou 3000 como padrão
const port = process.env.PORT || 3000;

// Middleware para erros 404
app.use(notFoundHandler)

// Middleware para erros 500
app.use(errorHandler)

// Inicia o servidor Express na porta definida
app.listen(port, () => console.log(
    `Servidor Express rodando em http://localhost:${port};` + `\n` + 
    `Pressione Ctrl-C para encerrar.`
))