import React from 'react';
import HeuristicComponent from './HeuristicComponent';
import Severity from '../Severity/Severity';
import styles from './Heuristic.module.css';


const Heuristic = ( { image, userName, violatedHeuristic, severityLevel, description, recommendations, heuristicId, checkbox, selecionados } ) => {
  return (
    <div>
        
        <div className={styles.contentContainer} >

          <div className={styles.imageContainer}>
            <div className={styles.title}>Screen</div>
            <div className={styles.image}>
              <img src={image} alt={`Imagem`} />
            </div>
            <div className={styles.subtitle}>Avaliado por: {userName}</div>
          </div>

        <div className={styles.heuristic} >
          <div className={styles.boxContainer}>
            <div className={styles.title}>Violated heuristic</div>
            <HeuristicComponent number={violatedHeuristic} />
              <div className={styles.title}>Severity level</div>
              <Severity severity={severityLevel} />
          </div>

          <div className={styles.boxContainer}>
            <div className={styles.title}>Violation description</div>
            <div className='subtext'>{description}</div>
          </div>

          <div className={styles.boxContainer}>
            <div className={styles.title}>Recommendations</div>
            <div className='subtext'>{recommendations}</div>
          </div>
        </div>

          <div className={styles.checkboxContainer}>
            <div className={styles.title}> Submit to final report </div>
            <div className={styles.buttonContainer}>
              <input 
                id={`check-${heuristicId}`} 
                type='checkbox' 
                checked={selecionados.includes(heuristicId)} 
                onChange={() => checkbox(heuristicId)} 
              />
              <label htmlFor={`check-${heuristicId}`} className={styles.button}></label>
            </div>
          </div>
          
        </div>

    </div>
  )
}

export default Heuristic