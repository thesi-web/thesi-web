import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Project.module.css';
import Button from '../Button/Button'
import Status from '../Status/Status';
import NavigationBar from './NavigationBar';

const Projects = () => {

  const navigate = useNavigate();
  const [projeto, setProjeto] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handlehProjects = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/professor/project`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      const data = await response.json();
      setProjeto(data);
    } catch (error) {
      console.error('Erro ao buscar os projetos:', error);
    }
  };

  useEffect(() => {
    handlehProjects();
  }, []);

  const handleClick = (id) => {
    navigate(`/rate/project/${id}`);
  };

  return (
    <div className={styles.container}>
      
      <NavigationBar />

      {projeto.map((projeto) => (
        <div key={projeto.id_projeto} className={styles.thesiProjetoContainer}>

          <div className={styles.prBoxTitle}>
              <div
                className={styles.prNomeContainer}
              >
              <div className={styles.thesiLabel} id='project_id' > {projeto.id_projeto} </div>
              <div className={styles.thesiLabel}> {projeto.nm_projeto} </div>
            </div>
            <div className={'subtext'}>{projeto.nm_usuario}</div>
          </div>

          <div className={styles.prBoxTitle}>
            <div className={styles.thesiLabel}>Team members</div>
            <div className="subtext" id={'autores'} >
              {(!projeto.nm_autores || projeto.nm_autores === '{}' || projeto.nm_autores.trim() === '') 
                ? 'Individual' 
                : projeto.nm_autores}
            </div>
          </div>

          <div className={styles.prBox}>
            <div className={styles.thesiLabel}>Creation date</div>
            <div className={'subtext'}>{projeto.dt_criacao}</div>
          </div>

          <div className={styles.prBox}>
            <div className={styles.thesiLabel}>Due date</div>
            <div className={'subtext'}>{projeto.dt_entrega}</div>
          </div>

          <div className={styles.prBox}>
            <div className={styles.thesiLabel}>Project Status</div>
            <div className={'subtext'}>{projeto.ds_status}</div>
          </div>

          
            <div className={styles.actions}>
              <Button
                variant={projeto.ds_status === "finalizado" || projeto.ds_status === "cancelado"
                  ? 'disabled'
                  : 'secondary'}
                  onClick={() => {
                    if (projeto.ds_status !== "finalizado") {
                      handleClick(projeto.id_projeto);
                    }
                  }}
              >
                Consolidate
              </Button>
            </div>
          
        </div>
      ))}
    </div>
  );
}

export default Projects;
