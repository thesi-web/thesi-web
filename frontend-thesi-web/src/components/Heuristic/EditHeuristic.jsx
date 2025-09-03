import React, { useState } from 'react';
import HeuristicComponent from './HeuristicComponent'
import styles from './EditHeuristic.module.css'
import Button from '../Button/Button'
import MessageModal from '../Modal/MessageModal'

const EditHeuristic = ( { image, userName, violatedHeuristic, severityLevel, description, recommendations, heuristicId, onDelete } ) => {

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  return (
        <div className={styles.heuristicContainer} >

            <div className={styles.imageContainer}>
                    <div className={styles.title}>Tela</div>
                    <div className={styles.image}>
                        <img src={image} alt={`Imagem`} />
                    </div>
                    <div className={styles.subtitle}>Avaliado por:  {userName}</div>
            </div>

            <div className={styles.boxContainer}>
                <div className={styles.title}>Heurística violada</div>
                <HeuristicComponent number={violatedHeuristic} />
                <div className={styles.title}>Grau de severidade <span className='subtext'>{severityLevel}</span> </div>
            </div>

            <div className={styles.boxContainer}>
                <div className={styles.title}>Descrição da violação</div>
                <div className='subtext'>{description}</div>
            </div>

            <div className={styles.boxContainer}>
                <div className={styles.title}>Recomendações</div>
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
          title={'Excluir Marcação'}
          message={`Tem certeza? Você não poderá fazer alterações após a exclusão.`}
          buttonMessage={'Excluir'}
        />        
        )}

      </div>
  )
}

export default EditHeuristic;