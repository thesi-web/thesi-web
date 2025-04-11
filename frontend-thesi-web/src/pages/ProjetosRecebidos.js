import React, { useState, useEffect } from 'react';
import '../styles/ProjetosRecebidos.css';
import Navbar from '../components/layout/Navbar';
import ProjetosCriadosProfessor from '../components/ProjetosCriadosProfessor';

const ProjetosRecebidos = () => {

  const [totalProjetos, setTotalProjetos] = useState([]);
  const [projetosFinalizados, setProjetosFinalizados] = useState(0);

  
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3001/professor/projetos', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      const data = await response.json();
      setTotalProjetos(data); // Atualiza o estado com os projetos da API
    } catch (error) {
      console.error('Erro ao buscar os projetos:', error);
    }
  };

  useEffect(() => {
    fetchProjects(); // Chama a função para buscar os projetos
  }, []);

  useEffect(() => {
    const finalizados = totalProjetos.filter(
      (projeto) => projeto.ds_status === 'FINALIZADO' // Use o campo correto para o status
    );
    setProjetosFinalizados(finalizados.length);
  }, [totalProjetos]);


  return (
    <div className='meus-projetos-container'>
    <div className="projetos-cadastrados-container">
      <Navbar />

      <div className="pr-contadores">
        <div className="pr-projetos-criados">
          <div className='pr-titulo-contador'>PROJETOS RECEBIDOS</div>
          <div className="pr-contador">{totalProjetos.length}</div>
        </div>
        <div className="pr-projetos-concluidos">
          <div className='pr-nome-contador'>Concluídos</div>
          <div className="pr-contador">
            {projetosFinalizados} de {totalProjetos.length}
          </div>
        </div>
      </div>

      
        <ProjetosCriadosProfessor projeto={totalProjetos} /> 
      

    </div>
    </div>
  );
};

export default ProjetosRecebidos;

