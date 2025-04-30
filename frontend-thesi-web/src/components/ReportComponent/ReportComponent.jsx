import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import styles from './ReportComponent.module.css'
import ReportHeuristic from './ReportHeuristic'
import ReportSemiotic from './ReportSemiotic'
import Cover from '../Cover/Cover'
import Button from '../Button/Button'
import html2pdf from 'html2pdf.js';

const ReportComponent = () => {

  const { projetoId } = useParams();
  const [semiotica, setSemiotica] = useState([]);
  const [heuristica, setHeuristica] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const handleHeuristica = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/heuristic/${projetoId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });

        if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
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

  useEffect(() => {
    const handleSemiotica = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/semiotic/${projetoId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });

        if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
        const data = await response.json();
        setSemiotica(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    handleSemiotica();
  }, [projetoId]);

  useEffect(() => {
    // Ativa o botão de download só depois que tudo estiver pronto
    if (heuristica.length > 0 || semiotica.length > 0) {
      setIsReady(true);
    }
  }, [heuristica, semiotica]);

  const handleDownload = () => {
    setTimeout(() => {
      const element = document.getElementById('pdf-content');
      html2pdf().set({
        html2canvas: { useCORS: true }
      }).from(element).save(`report-${projetoId}.pdf`);
      
    }, 500); 
  };
  

  return (
    <div>
    
      <div>
        <Cover />
      </div>

      <div className={styles.titleContainer}>
        <div className={styles.titleSection}>
          <div className={'title'}>Usability Report</div>
          <Button variant={'icon'} onClick={handleDownload} disabled={!isReady}>
            <i className="bi bi-download"></i>
          </Button>
        </div>
        <p>Summary of heuristic and semiotic inspection results, including severity levels and design recommendations.</p>
      </div>

      <div className={styles.container}>
        <div className={styles.pdfPage} id="pdf-content">
          {heuristica.map((heuristica, index) => (
            <ReportHeuristic 
              key={`heur-${index}`}
              name={heuristica.nm_heuristica} 
              severity={heuristica.nr_severidade} 
              violation={heuristica.ds_problemas} 
              recommendation={heuristica.ds_recomendacoes}
              image={heuristica.ds_caminho} />  
          ))}

          {semiotica.map((semiotica, index) => (
            <ReportSemiotic 
              key={`semi-${index}`}
              sign={semiotica.nm_signo} 
              expected={semiotica.ds_esperada} 
              possible={semiotica.ds_possivel} 
              observed={semiotica.ds_quebra} 
              recommendationS={semiotica.ds_recomendacoes} 
              image={semiotica.ds_caminho}
              icon={semiotica.nm_signo} />
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default ReportComponent;
