import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login'
import CreateProject from './pages/CreateProject';
import Project from './pages/Project';
import Heuristic from './components/Heuristic/Heuristic';
import LayoutComSidebar from './pages/LayoutComSidebar';
import BemVindo from './pages/BemVindo';
import Hero from './pages/Hero';
import CreateAccount from './pages/CreateAccount';


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/create/account" element={<CreateAccount/>} />
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
