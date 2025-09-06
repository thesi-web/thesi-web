// config/socket.js
let io = null;
const mapaDeSockets = {};

function initSocket(server) {
  const { Server } = require("socket.io");
  io = new Server(server, {
    cors: {
      origin: "*", // ou o front real
      methods: ["GET", "POST", "PUT", "DELETE"]
    }
  });

  io.on("connection", (socket) => {
    console.log("Novo usuário conectado:", socket.id);

    socket.on("registrarUsuario", (userId) => {
      mapaDeSockets[userId] = socket.id;
      console.log(`Usuário ${userId} registrado com socket ${socket.id}`);
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of Object.entries(mapaDeSockets)) {
        if (socketId === socket.id) {
          delete mapaDeSockets[userId];
          console.log(`Usuário ${userId} desconectado`);
          break;
        }
      }
    });
  });

  return io;
}

function getIo() {
  if (!io) throw new Error("Socket.IO não inicializado!");
  return io;
}

module.exports = { initSocket, getIo, mapaDeSockets };
