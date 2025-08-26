require("dotenv").config();

const express = require('express')
const app = express()
const http = require('http').createServer(app);
const { Server } = require("socket.io");
const path = require('path');


const io = new Server(http, {
    cors: {
      origin: '*', // ou especificar seu front real
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
  });

const userRoutes = require("../routes/routes")

const session = require('express-session');

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoutes);

app.get('/', (req, res) => {
  res.send('API THESI está rodando! 🚀');
});


app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
}));

const mapaDeSockets = {};


io.on('connection', (socket) => {

  console.log('Novo usuário conectado:', socket.id);

  // Ouvir o evento 'consolidacaoRealizada' emitido pelo frontend
  socket.on('consolidacaoRealizada', async(data) => {

    console.log(`Consolidação realizada para o projeto ${data.projetoId}`);
    
    try {

      const integrantes = await Project.findMembers(data.projetoId);

      if(!integrantes || integrantes.length === 0){
        console.error('Membros não encontrados');
        return;
      }

      for (const membro of integrantes) {

        const socketId = mapaDeSockets[membro.id_usuario];

        await Notifications.create(
          membro.id_usuario,
          data.projetoId,
          `/report/${data.projetoId}`
        );

        if (socketId) {
          io.to(socketId).emit('notificacaoConsolidacao', { 
            mensagem: 'Sua consolidação foi realizada!', 
            projetoId: data.projetoId,
            link: `/report/${data.projetoId}`
          });
        }
      }


    } catch (error) {
      console.error('Erro ao buscar projeto:', error);
    }

  });

   // Suponha que o frontend envie o ID do usuário depois de conectar
   socket.on('registrarUsuario', (userId) => {
    mapaDeSockets[userId] = socket.id; // salva no mapa
    console.log(`Usuário ${userId} registrado com socket ${socket.id}`);
  });

  socket.on('disconnect', () => {
    // Remover o usuário desconectado do mapa
    for (const [userId, socketId] of Object.entries(mapaDeSockets)) {
      if (socketId === socket.id) {
        delete mapaDeSockets[userId];
        console.log(`Usuário ${userId} desconectado`);
        break;
      }}});

});



// Importa os middlewares de erro
const notFoundHandler = require('../middlewares/notFound')
const errorHandler = require('../middlewares/errorHandler');
const Project = require("../models/Project");
const Notifications = require("../models/Notifications");

// Define a porta do servidor, utilizando a variável de ambiente PORT ou 3000 como padrão
const port = process.env.PORT || 3000;
const apiUrl = process.env.VITE_API_URL;

// Middleware para erros 404
app.use(notFoundHandler)

// Middleware para erros 500
app.use(errorHandler)

// Inicia o servidor Express na porta definida
http.listen(port, () => console.log(
  `Servidor Express rodando em ${apiUrl}:${port};` + `\n` + 
  `Pressione Ctrl-C para encerrar.`
))

console.log(`link das requisições:${apiUrl}`);