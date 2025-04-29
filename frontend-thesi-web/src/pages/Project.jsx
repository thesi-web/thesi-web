import React, { useState, useEffect, useCallback } from 'react';
import Status from '../components/Status/Status'
import styles from "./Project.module.css"
import Cover from '../components/Cover/Cover'
import Carroussel from '../components/Carroussel/Carroussel'
import Button from '../components/Button/Button'
import { useParams } from 'react-router-dom';
import MessageModal from '../components/Modal/MessageModal';
import MarksModal from '../components/Modal/MarksModal';

const Project = () => {

  const [projeto, setProjeto] = useState({ imagens: [] });
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marksModal, setMarksModal] = useState(false);

  const { projetoId } = useParams();

  // função de fetch isolada e memoizada
  const fetchProjeto = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/project/${projetoId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar o projeto.');
      }

      const data = await response.json();
      setProjeto(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [projetoId]);

  useEffect(() => {
    fetchProjeto();
  }, [fetchProjeto]);

  const entregarProjeto = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/project/${projetoId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }

      // Atualiza os dados após sucesso
      await fetchProjeto();
      setIsMessageModalOpen(false); 

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.page}>
      <Cover />
      <div className={styles.projectContainer}>
        <div className={styles.titleContainer}>
          <div className={'title'}>{projeto.nm_projeto}</div>
        <div className={styles.titleContainer}>  
          {projeto.ds_status !== 'entregue' || 'finalizado' && (
            <Button id={'bullet'} variant={'icon'} icon={<i className="bi bi-journals"></i>} onClick={() => setMarksModal(true)} />
          )}
          <Status status={`${projeto.ds_status}`} />
        </div>
        </div>
        <p> Created on {projeto.dt_criacao} by {projeto.criador} </p>
        <div className={styles.objectiveContainer}>
          {projeto.ds_projeto}
        </div>
        <Carroussel images={projeto.imagens} projetoId={projetoId} isDisabled={projeto.ds_status === 'entregue' || 'finalizado'}  />
        <div className={styles.buttonContainer}>
        {projeto.ds_status !== 'entregue' ||'finalizado' && (
          <Button type="submit" variant="secondary" onClick={() => setIsMessageModalOpen(true)}>
            Submit project
          </Button>
        )}
        {isMessageModalOpen && (
          <MessageModal
            isMessageOpen={isMessageModalOpen}
            setMessageModalOpen={() => setIsMessageModalOpen(false)}
            onClick={entregarProjeto}
            title={'Submit Project'}
            message={`Are you sure? You won't be able to make changes after submission.`}
            buttonMessage={'Submit'}
          />
        )}
        {marksModal && (
          <MarksModal
            isMarksModalOpen={marksModal}
            setMarksModalOpen={() => setMarksModal(false)}
            projetoId={projetoId}
          />
        )}
        </div>
      </div>
    </div>
  );
};

export default Project;
