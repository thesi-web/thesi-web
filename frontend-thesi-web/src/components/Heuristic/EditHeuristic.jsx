import React, { useState } from 'react';
import HeuristicComponent from './HeuristicComponent'
import Severity from '../Severity/Severity'
import styles from './EditHeuristic.module.css'
import Button from '../Button/Button'
import MessageModal from '../Modal/MessageModal'

const EditHeuristic = ( { image, userName, violatedHeuristic, severityLevel, description, recommendations, heuristicId, onDelete } ) => {

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  return (
        <div className={styles.heuristicContainer} >

            <div className={styles.boxContainer}>

            <div className={styles.title}>Screen</div>
            <div className={styles.image}>
                <img src={image} alt={`Imagem`} />
            </div>
            <div className={styles.subtitle}>Reviewed by: {userName}</div>

            </div>

            <div className={styles.boxContainer}>
                <div className={styles.title}>Violated heuristic</div>
                <HeuristicComponent number={violatedHeuristic} />
                <div className={styles.title}>Severity level </div>
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

        <div>
            <Button onClick={() => setIsMessageModalOpen(true)} id={'trash_btn'} variant={'close'} icon={<i className="bi bi-trash3"></i>} />
        </div>

        {isMessageModalOpen && (
          <MessageModal
          isMessageOpen={isMessageModalOpen}
          setMessageModalOpen={() => setIsMessageModalOpen(false)}
          onClick={async () => {
            await onDelete(heuristicId);
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

export default EditHeuristic;