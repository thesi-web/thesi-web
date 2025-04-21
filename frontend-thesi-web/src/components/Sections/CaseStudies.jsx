import React from 'react'
import styles from './CaseStudies.module.css'
import Button from '../Button/Button'

const CaseStudies = () => {
  return (
    <div className={styles.caseContainer}>
      
      <div className={styles.container}>

        <div className={styles.imagePlaceholder}/>

        <div className={styles.contentContainer} >
          <div className='title'> 
            Case Study
          </div>
            <p className={styles.paragraph}>Your opinion is important to us!</p>
            <p className={styles.paragraph}>In this first round of testing, Thesi will be available for evaluation in FATEC's laboratories. </p>
            <p className={styles.paragraph}>Feel free to leave us a comment or suggestion!</p>
          <Button variant={'primary'}>
            Leave feedback
          </Button>
        </div>
        
      </div>

    </div>
  )
}

export default CaseStudies