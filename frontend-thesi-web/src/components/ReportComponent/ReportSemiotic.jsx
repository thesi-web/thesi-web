import React from 'react'
import styles from './ReportSemiotic.module.css'

const Semiotic = ( { sign, expected, possible, observed, recommendationS, image, icon } ) => {

  const icons = {
    "dinamico": <i className="bi bi-ui-checks-grid"></i>,
    "estatico": <i className="bi bi-grid-1x2-fill"></i>,
    "meta": <i className="bi bi-pip"></i>,
  };


  return (
    <div className={styles.content}>
      <div className={styles.section}>

        <div>
          <div className={styles.titleContainer}>
            <div className={styles.titleBlue} >{sign}</div>
            <div className={styles.icon}>{icons[icon]}</div>
          </div>
         <img src={image} className={styles.imagePlaceholder}/>
        </div>

        <div className={styles.rightPanel}>
          <div  className={styles.boxColor} >
            <div className={styles.titleBlue} >Expected reading</div>
            <div className='subtext-color' >{expected}</div>
          </div>
          
          <div className={styles.box} >
            <div className={styles.title} >Possible reading</div>
            <div className='subtext' >{possible}</div>
          </div>

          <div className={styles.box} >
            <div className={styles.title} >Observed break</div>
            <div className='subtext' >{observed}</div>
          </div>

          <div className={styles.boxColor} >
            <div className={styles.titleBlue} > Recommendations</div>
            <div className='subtext-color'>{recommendationS}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Semiotic