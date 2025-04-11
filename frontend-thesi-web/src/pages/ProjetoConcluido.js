import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import PROJETO from '../assets/img/ProjetoRecebido.png';

const ProjetoConcluido = () => {

  const { projetoId } = useParams();
  const [ projeto, setProjeto ] = useState([]);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/recuperar-projeto/${projetoId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setProjeto(data[0]);
    } catch (error) {
      console.error('Erro ao buscar os projetos:', error);
    }
  }, [projetoId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects])


  return (
    <div className='projeto-concluido-container'>
      <Navbar /> 
      <div>
        <div className="thesi-titulo-lilas-secao"> Projeto Concluído!</div>
        <img className='i-imagem' src={PROJETO} alt="imagem de projeto concluído"/>
        <div className='thesi-texto'> PARABÉNS! VOCÊ CONCLUIU O PROJETO <div className='nome-projeto'>{projeto.nm_projeto}</div>. </div>
      </div>
    </div>
  );
}

export default ProjetoConcluido;
