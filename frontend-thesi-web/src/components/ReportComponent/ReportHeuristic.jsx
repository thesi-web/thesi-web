import React from 'react'
import styles from './ReportHeuristic.module.css'
import HeuristicComponent from '../Heuristic/HeuristicComponent'
import Severity from '../Severity/Severity'

const ReportHeuristic = ( { name, severity, violation, recommendation, image } ) => {
  return (
    <div className={styles.content} >
      <div className={styles.section}>
      <img className={styles.imagePlaceholder} src={image} />

      <div className={styles.contentContainer} >
        <div> 
          <div className={styles.title}> Violated Heuristic </div>
          <HeuristicComponent number={name} /> 
        </div>
        <div>
        <div className={styles.title}> Severity Level </div>
          <Severity severity={severity} />
        </div>
      </div>
      </div> 
      <div className={styles.container} >
      <div className={styles.textBox}>
          <div className={styles.title}> Violation Description </div>
          <div className='subtext' >{violation}</div>
      </div>
      <div className={styles.textBox} >
          <div className={styles.title}> Recommendations </div>
          <div className='subtext' >{recommendation}</div>
        </div>
      </div>
    </div>
  )
}

export default ReportHeuristic