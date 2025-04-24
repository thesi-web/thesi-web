import React from 'react'
import styles from './Semiotic.module.css'

const Semiotic = ( { sign, expected, possible, observed, recommendationS, image} ) => {
  return (
    <div className={styles.section}>
        
    <img src={image} className={styles.imagePlaceholder}/>

    <div className={styles.rightPanel}>
      <div>
        <div>Expected reading</div>
        <div>{expected}</div>
      </div>
      
      <div>
        <div>Possible reading</div>
        <div>{possible}</div>
      </div>

      <div>
        <div>Observed break</div>
        <div>{observed}</div>
      </div>

      <div>
        <div>Recommendations</div>
        <div>{recommendationS}</div>
      </div>

    </div>

    
  </div>

   
  )
}

export default Semiotic