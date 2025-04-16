import React from 'react'
import styles from './Heuristic.module.css'
import HeuristicComponent from './HeuristicComponent'
import Severity from '../Severity/Severity'

const Heuristic = () => {
  return (
    <div className={styles.heuristicContainer}>
        <div className={styles.imageContainer}>
        <div className={styles.title}>
             Tela
            </div>
            <div className={styles.image} >
                <img/>
            </div>
            <div className={styles.subtitle} >Avaliado por: João Vitor Serra de Freitas</div>
        </div>
        <div className={styles.boxContainer}>
            <div className={styles.title}>
              Heurística violada
            </div>
            <HeuristicComponent number={'0'} />
            <div className={styles.title}>
              Grau de severidade
            </div>
            <Severity severity={1} />
        </div>

        <div className={styles.boxContainer}>
          <div className={styles.title}>
            Descrição da violação
          </div>
            <p> O sistema exibe o campo “Severidade”, mas não oferece nenhuma explicação sobre o que cada nível significa.</p>
              <p>Isso pode levar o usuário a fazer escolhas incorretas.</p>
        </div>

        <div className={styles.boxContainer}>
          <div className={styles.title}>
            Recomendações
          </div>
          <p> Adicionar um ícone de ajuda ou tooltip explicando os níveis de severidade.</p>
        </div>
    </div>
  )
}

export default Heuristic