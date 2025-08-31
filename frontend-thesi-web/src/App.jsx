// App.jsx
import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ProjectsProvider } from './context/ProjectContext';
import { jwtDecode } from "jwt-decode";
import { io } from 'socket.io-client';

import Login from './pages/Login'
import CreateProject from './pages/CreateProject';
import Project from './pages/Project';
import LayoutComSidebar from './pages/LayoutComSidebar';
import Hero from './pages/Hero';
import CreateAccount from './pages/CreateAccount';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import Homescreen from './pages/Homescreen';
import ReportComponent from './components/ReportComponent/ReportComponent';
import Semiotic from './components/ReportComponent/ReportSemiotic';
import Consolidate from './components/Heuristic/Consolidate';
import Professor from './pages/Professor';
import Projects from './components/Professor/Projects';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Trash from './pages/Trash';

let socket;

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [socketInstance, setSocketInstance] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {

    const token = localStorage.getItem("token");
  
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000; 
  
        if (decoded.exp > now) {
          setIsAuthenticated(true);
        } else {
          console.log('Token expirado');
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.log('Token inválido');
        localStorage.removeItem("token");
      }
    }
  }, []);
  
  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem("token");
      const userId = jwtDecode(token).id;

      // Criando o socket apenas quando o usuário estiver autenticado
      const socketInstance = io(`${apiUrl}`, {
        autoConnect: false,
        auth: { token }
      });

      socketInstance.connect();

      socketInstance.on('connect', () => {
        console.log('Socket conectado:', socketInstance.id);
        socketInstance.emit('registrarUsuario', userId);
      });

      socketInstance.on('projetoCorrigido', (mensagem) => {
        console.log('Projeto corrigido:', mensagem);
      });

      // Atualizando o estado com a instância do socket
      setSocketInstance(socketInstance);

      // Limpeza ao desmontar
      return () => {
        socketInstance.disconnect();
        console.log('Socket desconectado');
      };
    }
  }, [isAuthenticated]);

  return (
    <HashRouter>
      <Routes>
      <Route path="/" element={<Hero/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/create/account" element={<CreateAccount/>} />
        <Route path="/change/password/:token" element={<ChangePassword/>} />
        <Route path="/forgot/password" element={<ForgotPassword/>} />
  
        {/* Rotas protegidas para 'professor' */}
        <Route path='/professor/home' element={<ProtectedRoute roleRequired="professor"><Professor /></ProtectedRoute>} />
        <Route path='/professor/projects' element={<ProtectedRoute roleRequired="professor"><Projects /></ProtectedRoute>} />
        <Route path='/rate/project/:projetoId' element={<ProtectedRoute roleRequired="professor"><Consolidate /></ProtectedRoute>} />
        
        {/* Páginas que contém a sidebar */}
        <Route element={<ProjectsProvider><LayoutComSidebar /></ProjectsProvider>}>
          <Route path="/home" element={<ProtectedRoute roleRequired="aluno"><Homescreen /></ProtectedRoute>} />
          <Route path="/report/:projetoId" element={<ProtectedRoute roleRequired="aluno"><ReportComponent /></ProtectedRoute>} />
          <Route path="/create/project" element={<ProtectedRoute roleRequired="aluno"><CreateProject /></ProtectedRoute>} />
          <Route path='/project/:projetoId' element={<ProtectedRoute roleRequired="aluno"><Project /></ProtectedRoute>} />
          <Route path='/trash' element={<ProtectedRoute roleRequired="aluno"><Trash /></ProtectedRoute>} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
