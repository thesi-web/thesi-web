require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");
const session = require("express-session");

// rotas e middlewares
const userRoutes = require("../routes/routes");
const notFoundHandler = require("../middlewares/notFound");
const errorHandler = require("../middlewares/errorHandler");

// Models
const Project = require("../models/Project");
const Notifications = require("../models/Notifications");

// Socket
const { initSocket, mapaDeSockets } = require("./socket");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRoutes);

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(notFoundHandler);
app.use(errorHandler);

// Inicializa Socket.IO
const io = initSocket(http);

const port = process.env.PORT || 3000;
const apiUrl = process.env.VITE_API_URL;

http.listen(port, () => console.log(
  `Servidor Express rodando em ${apiUrl}:${port}`
));

module.exports = { io, mapaDeSockets };
