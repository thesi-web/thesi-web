import React, { useState, useEffect, useCallback } from 'react';
import AvaliacaoSemiotica from '../components/AvaliacaoSemiotica';
import AvaliacaoHeuristica from '../components/AvaliacaoHeuristica';
import '../styles/AvaliacaoConsolidada.css';
import Navbar from "../components/layout/Navbar";
import { useParams, useNavigate } from 'react-router-dom'; 

const AvaliacaoConsolidada = () => {

  
  const { projetoId } = useParams();
  const [semiotica, setSemiotica] = useState([]);
  const [heuristica, setHeuristica] = useState([]);
  const [projeto, setProjeto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {

    const handleHeuristica = async () => {
      try {
        const response = await fetch(`http://localhost:3001/heuristica/${projetoId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });

        if (!response.ok) {
          throw new Error(`Erro: ${response.statusText}`);
        }

        const data = await response.json();
        setHeuristica(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    handleHeuristica();
  }, [projetoId]);

  useEffect(() => {
    const handleSemiotica = async () => {
      try {
        const response = await fetch(`http://localhost:3001/semiotica/${projetoId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });

        if (!response.ok) {
          throw new Error(`Erro: ${response.statusText}`);
        }

        const data = await response.json();
        setSemiotica(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    handleSemiotica();
  }, [projetoId]);

  const finalizarProjeto = async () => {

    try {
      const response = await fetch(`http://localhost:3001/finalizar/${projetoId}`, {
        method: 'PUT', 
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
  
      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      } 
        
  
    } catch (err) {
      setError(err.message);
    }

    navigate(`/projeto/concluido/${projetoId}`);

  };

  const handleClick = (projetoId) => {
    navigate(`/avaliar-projeto/${projetoId}`);
    };
  
    
     // Verifique se todos os campos st_avaliacao são iguais a 1
    const canFinalize = 
    heuristica.every(item => item.st_correcao === 1) && 
    semiotica.every(item => item.st_correcao === 1);


  return (
    <div className="avaliacao-consolidada-container">
      <Navbar />
      
      <div className='thesi-titulo-lilas-secao'>AVALIAÇÃO CONSOLIDADA</div>
      <div className='ac-sub-titulo-secao'>Agora é o momento para os grupos e o professor colaborarem em equipe!</div>

      {loading && <p>Carregando...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
          <div>
            {heuristica.map((heuristica, index) => (
              <AvaliacaoHeuristica key={heuristica.id_heuristica} avaliacao={heuristica} />
            ))}

            {semiotica.map((semiotica, index) => (
              <AvaliacaoSemiotica key={semiotica.id_semiotica} avaliacao={semiotica} /> 
          ))}
        </div>
      )}

      <div className='ca-botao-container'>
        <div className='ca-botao-tamanho'>
          <button 
            className="thesi-botao-branco"
            onClick={() => handleClick(projetoId)}
          > RETORNAR </button>
        </div>
        <div className='ca-botao-tamanho'>
        <button
          className={`${
            projeto.ds_status === 'FINALIZADO' ? 'some-btn' : 'thesi-botao-verde'
          }`}
          onClick={finalizarProjeto}
          disabled={!canFinalize}
        >
          FINALIZAR VALIDAÇÃO
        </button>
        </div>
      </div>
    </div>
  );
};

export default AvaliacaoConsolidada;
