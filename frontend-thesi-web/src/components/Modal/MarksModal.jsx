import React, { useState, useEffect } from 'react';
import styles from './MarksModal.module.css';
import Button from '../Button/Button';
import EditHeuristic from '../Heuristic/EditHeuristic';
import EditSemiotic from '../Heuristic/EditSemiotic';
import Warning from '../Warning/Warning';

const MarksModal = ({ isMarksModalOpen, setMarksModalOpen, projetoId }) => {
  const [heuristica, setHeuristica] = useState([]);
  const [semiotica, setSemiotica] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  // mover para FORA do useEffect
  const handleEstado = async () => {
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
      console.log(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleEstado();
  }, [projetoId]);

  const handleDeleteHeuristica = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/heuristic/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        await handleEstado();
      } else {
        console.error('Erro ao deletar marcação:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao deletar marcação:', error);
    }
  };

  const handleDeleteSemiotica = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/semiotic/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        await handleEstado();
      } else {
        console.error('Erro ao deletar marcação:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao deletar marcação:', error);
    }
  };

  return (
  <div className={styles.backdrop} onClick={setMarksModalOpen}>
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <div className={styles.header}>
        <div className={styles.title}>Marcações heurísticas e semióticas</div>
        <div onClick={setMarksModalOpen} className={styles.closeModal}><i className="bi bi-x-lg"></i></div>
      </div>

      <div className={styles.container}>
        {/* Mensagem quando não há heurística nem semiótica */}
        {heuristica.length === 0 && semiotica.length === 0 && !loading && (
            <Warning icon={<i className="bi bi-exclamation-circle"></i>} title={'Ainda não há marcações!'} message={'Quando uma avaliação heurística ou semiótica for feita, ela aparecerá aqui para edição.'} />
        )}

        {heuristica.map((heuristic, index) => (
          <EditHeuristic
            key={index}
            image={heuristic.ds_caminho}
            userName={heuristic.nm_usuario}
            violatedHeuristic={heuristic.nm_heuristica}
            severityLevel={heuristic.nr_severidade}
            description={heuristic.ds_problemas}
            recommendations={heuristic.ds_recomendacoes}
            heuristicId={heuristic.id_heuristica}
            onDelete={handleDeleteHeuristica}
          />
        ))}

        {semiotica.map((semiotic, index) => (
          <EditSemiotic
            key={index}
            image={semiotic.ds_caminho}
            userName={semiotic.nm_usuario}
            signName={semiotic.nm_signo}
            expected={semiotic.ds_esperada}
            possible={semiotic.ds_possivel}
            observed={semiotic.ds_quebra}
            recommendations={semiotic.ds_recomendacoes}
            semioticId={semiotic.id_semiotica}
            onDelete={handleDeleteSemiotica}
          />
        ))}
      </div>
    </div>
  </div>
);

};

export default MarksModal;
