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

  useEffect(() => {
    const handleHeuristica = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/marks/${projetoId}`, {
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
      const response = await fetch(`http://localhost:3000/api/consolidate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          role: 'professor'
        },
        body: JSON.stringify({ heuristics: selecionadosH, semiotics: selecionadosS }),
      });
  
      if (!response.ok) throw new Error('Erro ao enviar consolidação');
      navigate('/home');
      
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