import React from 'react'
import styles from './ReportHeuristic.module.css'
import HeuristicComponent from '../Heuristic/HeuristicComponent'
import Severity from '../Severity/Severity'

const ReportHeuristic = ( { name, severity, violation, recommendation, image } ) => {
  return (
    <div>
      <div className={styles.section}>
        <img className={styles.imagePlaceholder} src={image} />

        <div className={styles.contentContainer} >
          <div> 
            <div className={styles.title}> Heurística Violada </div>
            <HeuristicComponent number={name} /> 
          </div>
          <div>
          <div className={styles.title}> Grau de Severidade </div>
            <Severity severity={severity} />
          </div>
        </div>
      </div> 

      <div className={styles.container} >
        <div>
            <div className={styles.title}> Descrição da Violação </div>
            <div>{violation}</div>
        </div>
        <div>
            <div className={styles.title}> Recomendações </div>
            <div>{recommendation}</div>
          </div>
        </div>
      </div>
  )
}

export default ReportHeuristic