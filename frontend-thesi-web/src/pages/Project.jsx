import React from 'react'
import Status from '../components/Status/Status'
import styles from "./Project.module.css"
import Cover from '../components/Cover/Cover'
import Carroussel from '../components/Carroussel/Carroussel'
import Button from '../components/Button/Button'
import Modal from '../components/Modal/Modal'
import { useState } from 'react'

const Project = () => {

  return (
    <div className={styles.page}>
        <Cover />  
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer} >
            <div className={'title'}>🌈 A grande conquista</div>
            <Status />
            </div>
                <p> Criado dia 13 de abril de 2025 </p>
            <div className={styles.objectiveContainer}>
                Avaliar a interface do site Globo.com na seção de votos para o reality show A Grande Conquista.
            </div>
            <Carroussel images={[
            'img1.png',
            'img2.png',
            'img3.png',
            'img4.png',
            'img5.png'
            ]} />
            <div className={styles.buttonContainer}>
             <Button type='submit' variant='success'>Entregar Projeto</Button>
            </div>
        </div>
    </div>
  )
}

export default Project