import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProjectsProvider } from './context/ProjectContext';

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


function App() {
  return (
    <BrowserRouter>
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;