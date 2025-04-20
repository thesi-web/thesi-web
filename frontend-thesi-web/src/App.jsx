import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login'
import CriarConta from './pages/CriarConta';
import CreateProject from './pages/CreateProject';
import Project from './pages/Project';
import Heuristic from './components/Heuristic/Heuristic';
import LayoutComSidebar from './pages/LayoutComSidebar';
import BemVindo from './pages/BemVindo';
import LandingPage from './pages/LandingPage';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/criar-conta" element={<CriarConta/>} />
        {/* Página que contém a sidebar (Cuidado!) */}
        <Route element={<LayoutComSidebar/>}>
          <Route path="/home" element={<BemVindo/>} />
          <Route path ="/create/project" element={<CreateProject/>} />
          <Route path='/project/:projetoId' element={<Project/>} />
          <Route path='/rate/project/:projetoId' element={<Heuristic/>} />
        </Route>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
