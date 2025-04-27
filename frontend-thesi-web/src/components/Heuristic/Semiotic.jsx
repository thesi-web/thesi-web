import React from 'react'
import styles from './Semiotic.module.css';

const Semiotic = ( { image, userName, signName, expected, possible, observed, recommendations, semioticId, checkbox, selecionados } ) => {
  return (
    <div>
        <div className={styles.semioticContainer} >

        <div className={styles.imageContainer}>
        <div className={styles.title}>Screen</div>
        <div className={styles.image}>
            <img src={image} alt={`Imagem`} />
        </div>
        <div className={styles.subtitle}>Avaliado por: {userName}</div>
        </div>

        <div>
        <div className={styles.boxContainer}>
            <div className={styles.title}>Type of sign</div>
            <div className={'subtext'}>sign {signName}</div>
        </div>

        <div className={styles.boxContainer}>
            <div className={styles.title}>Expected reading</div>
            <div className='subtext'>{expected}</div>
        </div>
        </div>

        <div>
        <div className={styles.boxContainer}>
            <div className={styles.title}>Possible reading</div>
            <div className='subtext'>{possible}</div>
        </div>

        <div className={styles.boxContainer}>
            <div className={styles.title}>Observed break</div>
            <div className='subtext'>{observed}</div>
        </div>
        </div>

        <div className={styles.boxContainer}>
        <div className={styles.title}>Recommendations</div>
        <div className='subtext'>{recommendations}</div>
        </div>


        <div className={styles.checkboxContainer}>
        <div className={styles.title}> Submit to final report </div>
        <div className={styles.buttonContainer}>
            <input 
            id={`check-${semioticId}`} 
            type='checkbox' 
            checked={selecionados.includes(semioticId)} 
            onChange={() => checkbox(semioticId)} 
            />
            <label htmlFor={`check-${semioticId}`} className={styles.button}></label>
        </div>
        </div>

        </div>
    </div>
  )
}

export default Semiotic