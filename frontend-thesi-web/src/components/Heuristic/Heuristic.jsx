import React, { useState, useEffect } from 'react';
import styles from './Heuristic.module.css';
import HeuristicComponent from './HeuristicComponent';
import Severity from '../Severity/Severity';
import { useParams } from 'react-router-dom';

const Heuristic = () => {
  const { projetoId } = useParams();
  const [heuristica, setHeuristica] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleHeuristica = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/heuristic/${projetoId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erro: ${response.statusText}`);
        }

        const data = await response.json();
        setHeuristica(data);
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

  return (
    <div>
      {heuristica.map((item, index) => (
        <div key={index} className={styles.heuristicContainer}>
          <div className={styles.imageContainer}>
            <div className={styles.title}>Tela</div>
            <div className={styles.image}>
              <img src={item.ds_caminho} alt={`Imagem ${index + 1}`} />
            </div>
            <div className={styles.subtitle}>Avaliado por: {item.nm_usuario}</div>
          </div>

          <div className={styles.boxContainer}>
            <div className={styles.title}>Heurística Violada</div>
            <HeuristicComponent number={item.nm_heuristica} />
          </div>

          <div className={styles.severityContainer}>
            <div className={styles.title}>Grau de Severidade</div>
            <Severity severity={item.nr_severidade} />
          </div>

          <div className={styles.boxContainer}>
            <div className={styles.title}>Descrição da violação</div>
            <p>{item.ds_observacoes}</p>
          </div>

          <div className={styles.boxContainer}>
            <div className={styles.title}>Recomendações</div>
            <p>{item.ds_recomendacoes}</p>
          </div>
          
          <div className={styles.buttonContainer}>
              <input id="check" type='checkbox' />
              <label for="check" className={styles.button}  ></label>
          </div>

        </div>
      ))}
    </div>
  );
};

export default Heuristic;