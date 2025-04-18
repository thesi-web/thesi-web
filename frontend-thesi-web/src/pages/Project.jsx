import React, { useState, useEffect } from 'react';
import Status from '../components/Status/Status'
import styles from "./Project.module.css"
import Cover from '../components/Cover/Cover'
import Carroussel from '../components/Carroussel/Carroussel'
import Button from '../components/Button/Button'
import { useParams } from 'react-router-dom';

const Project = () => {

  const [projeto, setProjeto] = useState({ imagens: [] });

  const [loading, setLoading] = useState(true);
  
  const [error, setError] = useState(null);

  const { projetoId } = useParams();

  useEffect(() => {

    const fetchProjeto = async () => {
      try {
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
        console.log(data);
        setProjeto(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }

    };

    fetchProjeto();
  }, [projetoId]);

  return (
    <div className={styles.page}>
        <Cover />  
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer} >
            <div className={'title'}>{projeto.nm_projeto}</div>
              <Status status={`${projeto.ds_status}`}/>
            </div>
                <p> Criado dia {projeto.dt_criacao} </p>
            <div className={styles.objectiveContainer}>
                {projeto.ds_projeto}
            </div>
              <Carroussel images={projeto.imagens} />
            <div className={styles.buttonContainer}>
             <Button type='submit' variant='success'>Entregar Projeto</Button>
            </div>
        </div>
    </div>
  )
}

export default Project