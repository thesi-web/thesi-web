import React, { useState, useEffect } from 'react';
import styles from './Heuristic.module.css';
import HeuristicComponent from './HeuristicComponent';
import Severity from '../Severity/Severity';
import { useParams } from 'react-router-dom';
import Button from '../Button/Button'

const Heuristic = () => {
  const { projetoId } = useParams();
  const [heuristica, setHeuristica] = useState([]);
  const [semiotica, setSemiotica] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selecionados, setSelecionados] = useState([]);

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

  const handleCheckboxChange = (id) => {
    setSelecionados((prev) => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const enviarMarcacoesSelecionadas = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/project/consolidate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          role: 'professor'
        },
        body: JSON.stringify({ ids: selecionados }),
      });
  
      if (!response.ok) throw new Error('Erro ao enviar consolidação');
  
      alert('Marcação consolidada com sucesso!');
    } catch (err) {
      alert(`Erro: ${err.message}`);
    }
  };
  
  console.log(selecionados);


  return (
    <div className={styles.container} >
      {heuristica.map((item, index) => (
        <div key={index} className={styles.contentContainer} >

          <div className={styles.imageContainer}>
            <div className={styles.title}>Screen</div>
            <div className={styles.image}>
              <img src={item.ds_caminho} alt={`Imagem ${index + 1}`} />
            </div>
            <div className={styles.subtitle}>Avaliado por: {item.nm_usuario}</div>
          </div>

        <div className={styles.heuristic} >
          <div className={styles.boxContainer}>
            <div className={styles.title}>Violated heuristic</div>
            <HeuristicComponent number={item.nm_heuristica} />
              <div className={styles.title}>Severity level</div>
              <Severity severity={item.nr_severidade} />
          </div>

          <div className={styles.boxContainer}>
            <div className={styles.title}>Violation description</div>
            <div className='subtext'>{item.ds_problemas}</div>
          </div>

          <div className={styles.boxContainer}>
            <div className={styles.title}>Recommendations</div>
            <div className='subtext'>{item.ds_recomendacoes}</div>
          </div>
        </div>

          <div className={styles.checkboxContainer}>
            <div className={styles.title}> Submit to final report </div>
            <div className={styles.buttonContainer}>
              <input 
                id={`check-${item.id_heuristica}`} 
                type='checkbox' 
                checked={selecionados.includes(item.id_heuristica)} 
                onChange={() => handleCheckboxChange(item.id_heuristica)} 
              />
              <label htmlFor={`check-${item.id_heuristica}`} className={styles.button}></label>
            </div>
          </div>
          
        </div>
      ))}

      <Button variant={'secondary'} id={'form_btn'} onClick={enviarMarcacoesSelecionadas}> Consolidate </Button>

    </div>
  );
};

export default Heuristic;