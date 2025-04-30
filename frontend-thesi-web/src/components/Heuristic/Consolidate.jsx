import { io } from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../Button/Button'
import Heuristic from './Heuristic';
import Semiotic from './Semiotic';
import styles from './Consolidate.module.css'

const Consolidate = () => {

  
  const navigate = useNavigate();
  const { projetoId } = useParams();
  const [heuristica, setHeuristica] = useState([]);
  const [semiotica, setSemiotica] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selecionadosH, setSelecionadosH] = useState([]);
  const [selecionadosS, setSelecionadosS] = useState([]);
  const [socket, setSocket] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;


  useEffect(() => {
    const newSocket = io(`${apiUrl}`, { transports: ['websocket'] });
    setSocket(newSocket);
  
    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, []);
  

  useEffect(() => {
    const handleHeuristica = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/marks/${projetoId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erro: ${response.statusText}`);
        }

        const data = await response.json();

        setHeuristica(data.heuristics);
        setSemiotica(data.semiotics);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    handleHeuristica();

  }, [projetoId]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  const handleHeuristicCheckbox = (id) => {
    setSelecionadosH((prev) => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSemioticCheckbox = (id) => {
    setSelecionadosS((prev) => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const enviarMarcacoesSelecionadas = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/consolidate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          role: 'professor'
        },
        body: JSON.stringify({ heuristics: selecionadosH, semiotics: selecionadosS, idProjeto: projetoId }),
      });
  
      if (!response.ok) throw new Error('Erro ao enviar consolidação');
      
      if (socket) {
        socket.emit('consolidacaoRealizada', { projetoId });
      } else {
        console.error('Socket não conectado.');
      }
      
      navigate('/professor/home');

    } catch (err) {
      alert(`Erro: ${err.message}`);
    }
  };
  
  return (
    <div className={styles.container} >

      {heuristica.map((heuristic, index) => (
        <Heuristic 
          key={index}
          image={heuristic.ds_caminho}
          userName={heuristic.nm_usuario}
          violatedHeuristic={heuristic.nm_heuristica}
          severityLevel={heuristic.nr_severidade}
          description={heuristic.ds_problemas}
          recommendations={heuristic.ds_recomendacoes}
          heuristicId={heuristic.id_heuristica}
          checkbox={handleHeuristicCheckbox}
          selecionados={selecionadosH}
        />        
      ))}


      {semiotica.map((semiotic, index) => (
        <Semiotic
          key={index} 
          image={semiotic.ds_caminho}
          userName={semiotic.nm_usuario}
          signName={semiotic.nm_signo}
          expected={semiotic.ds_esperada}
          possible={semiotic.ds_possivel}
          observed={semiotic.ds_quebra}
          recommendations={semiotic.ds_recomendacoes}
          semioticId={semiotic.id_semiotica}
          checkbox={handleSemioticCheckbox}
          selecionados={selecionadosS}
        />
      ))}

      <Button variant={'secondary'} id={'form_btn'} onClick={enviarMarcacoesSelecionadas}> Consolidate </Button>

    </div>
  );
};

export default Consolidate;