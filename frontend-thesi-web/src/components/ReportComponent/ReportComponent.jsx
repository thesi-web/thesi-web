import React from 'react'
import styles from './ReportComponent.module.css'
import HeuristicComponent from '../Heuristic/HeuristicComponent'
import Severity from '../Severity/Severity'


const ReportComponent = () => {
  return (
    <div>
        
    <div className={styles.section}>
        <div className={styles.imagePlaceholder}/>

        <div className={styles.contentContainer} >
          <div> 
            <div className={styles.title}> Heurística Violada </div>
            <HeuristicComponent number={0} /> 
          </div>
          <div>
          <div className={styles.title}> Grau de Severidade </div>
          <Severity severity={4} />
          </div>
        </div>
    </div> 

    <div className={styles.container} >
      <div>
        <div className={styles.title}> Descrição da Violação </div>
        <div>texto aqui</div>
      </div>
        <div className={styles.title}> Recomendações </div>
    </div>
   
    </div>
  )
}

export default ReportComponent