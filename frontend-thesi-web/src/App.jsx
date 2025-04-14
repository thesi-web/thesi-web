import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login'
import CriarConta from './pages/CriarConta';
import HomePage from './pages/HomePage';
import CreateProject from './pages/CreateProject';
import Project from './pages/Project';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/criar-conta" element={<CriarConta/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path ="/create/project" element={<CreateProject/>} />
        <Route path='/project' element={<Project/>} />

        {/*
        <Route exact path="/esqueci-senha" element={<EsqueceuSenha />} />
        <Route exact path="/redefinir-senha/:token" element={<RedefinirSenha />} />
        <Route exact path="/inicio" element={<PaginaInicial />} />
        <Route path="/" element={<Navigate to="/inicio" />} />
        <Route exact path="/sobre-thesi" element={<SobreThesi />} />
        <Route exact path="/sobre-nos" element={<SobreNos />} />
        <Route exact path="/configuracoes" element={<MeuPerfil />} />
        <Route exact path='/projeto/concluido/:projetoId' element={<ProjetoConcluido />} /> 
        <Route exact path="/professor/configuracoes"
          element={<ProtectedRoute element={MeuPerfilProfessor} roleRequired="professor"/>}
        />
        <Route exact path="/professor/notificacoes"
          element={<ProtectedRoute element={ProfessorNotificacoes} roleRequired="professor" />}
          />
        <Route exact path="/professor/projetos-recebidos" element={<ProtectedRoute element={ProjetosRecebidos} roleRequired="professor" />} />
        <Route exact path="/notificacoes" element={<Notificacoes />} />
        <Route exact path="/avaliacao-consolidada/:projetoId" element={<AvaliacaoConsolidada />} />
        <Route exact path="/aluno/meus-projetos" element={<MeusProjetos />} />
        <Route exact path="/avaliar-projeto/:projetoId" element={<AvaliarProjeto />} />
        <Route exact path="/bem-vindo" element={<BemVindo />} />
        <Route exact path="/pdf" element={<PDFViewer />} />
        <Route exact path="/LGPD" element={<LGPD />}/>
        <Route exact path="/ComoFunciona" element={<ComoFunciona />} />
        */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
