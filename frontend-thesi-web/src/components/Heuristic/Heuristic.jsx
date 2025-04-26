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
  const [selecionados, setSelecionados] = useState([]);

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
    <div>
      {heuristica.map((item, index) => (
        <div key={index} className={styles.contentContainer} >

          <div className={styles.titleContainer} >
              <div className={styles.title}>
                Enviar para o relatório final
              </div>
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


        <div className={styles.heuristicContainer} >
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
            <p>{item.ds_problemas}</p>
          </div>

          <div className={styles.boxContainer}>
            <div className={styles.title}>Recomendações</div>
            <p>{item.ds_recomendacoes}</p>
          </div>
        </div>
          
        </div>
      ))}

      <button onClick={enviarMarcacoesSelecionadas}>Enviar Selecionados</button>

    </div>
  );
};

export default Heuristic;