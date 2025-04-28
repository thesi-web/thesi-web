import React, { useState } from 'react';
import styles from './EditSemiotic.module.css'
import Button from '../Button/Button'
import MessageModal from '../Modal/MessageModal';

const EditSemiotic = ( { image, userName, signName, expected, possible, observed, recommendations, semioticId, onDelete } ) => {

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  return (
    <div>
      <div className={styles.semioticContainer} >

        <div className={styles.imageContainer}>
        <div className={styles.title}>Screen</div>
        <div className={styles.image}>
            <img src={image} alt={`Imagem`} />
        </div>
        <div className={styles.subtitle}>Reviewed by:  {userName}</div>
        </div>

        <div>
          <div className={styles.title}>Type of sign</div>
          <div className={'subtext'}>sign {signName}</div>
        </div>

        <div>
          <div className={styles.boxContainer}>
              <div className={styles.title}>Expected reading</div>
              <div className='subtext'>{expected}</div>
          </div>
          <div className={styles.boxContainer}>
              <div className={styles.title}>Possible reading</div>
              <div className='subtext'>{possible}</div>
          </div>
        </div>

        <div>
        <div className={styles.boxContainer}>
            <div className={styles.title}>Observed break</div>
            <div className='subtext'>{observed}</div>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.title}>Recommendations</div>
          <div className='subtext'>{recommendations}</div>
        </div>
        </div>

        

        <div>
            <Button onClick={() => onDelete(semioticId)} id={'trash_btn'} variant={'close'} icon={<i className="bi bi-trash3"></i>} />
        </div>
      </div>

      {isMessageModalOpen && (
         <MessageModal
          isMessageOpen={isMessageModalOpen}
          setMessageModalOpen={() => setIsMessageModalOpen(false)}
          onClick={async () => {
            await onDelete(semioticId);
            setIsMessageModalOpen(false);
          }}          
          title={'Delete Mark'}
          message={`Are you sure? You won't be able to make changes after exclusion.`}
          buttonMessage={'Delete'}
       />
       
        )}
    </div>
  )
}

export default EditSemiotic