import React from 'react'
import styles from './Semiotic.module.css'

const Semiotic = () => {
  return (
    <div>
        
    <div className={styles.section}>
        <div className={styles.imagePlaceholder}/>

        <div className={styles.contentContainer} >
          <div> 
            <div className={styles.title}> Heurística Violada </div>
            
          </div>
          <div>
          <div className={styles.title}> Grau de Severidade </div>
       
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
   
    <div className={styles.rightPanel}>
      <div>dfmvkvo</div>
      <div>fdvdfv</div>
      <div>dfvdfvf</div>
      <div>dfdfbddb</div>
    </div>

    
  </div>

   
  )
}

export default Semiotic