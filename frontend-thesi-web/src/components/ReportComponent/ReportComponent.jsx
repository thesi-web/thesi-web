import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom'; 
import styles from './ReportComponent.module.css'
import ReportHeuristic from './ReportHeuristic'
import ReportSemiotic from './ReportSemiotic'

const ReportComponent = () => {

  const { projetoId } = useParams();
  const [semiotica, setSemiotica] = useState([]);
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
        const response = await fetch(`http://localhost:3000/api/semiotic/${projetoId}`, {
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

  return (
    <div className={styles.container}>
      
      
      {heuristica.map((heuristica, index) => (
              <ReportHeuristic 
                name={heuristica.nm_heuristica} 
                severity={heuristica.nr_severidade} 
                violation={heuristica.ds_problemas} 
                recommendation={heuristica.ds_recomendacoes}
                image={heuristica.ds_caminho} />  
            ))}

            {semiotica.map((semiotica, index) => (
              <ReportSemiotic 
                sign={semiotica.nm_signo} 
                expected={semiotica.ds_esperada} 
                possible={semiotica.ds_possivel} 
                observed={semiotica.ds_quebra} 
                recommendationS={semiotica.ds_recomendacoes} 
                image={semiotica.ds_caminho}
                icon={semiotica.nm_signo} />
          ))}
   
    </div>
  )
}

export default ReportComponent