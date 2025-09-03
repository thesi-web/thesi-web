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
        <div className={styles.title}>Tela</div>
        <div className={styles.image}>
            <img src={image} alt={`Imagem`} />
        </div>
        <div className={styles.subtitle}>Avaliado por:  {userName}</div>
        </div>

        <div>
          <div className={styles.title}>Tipo de signo</div>
          <div className="subtext" style={{ color: "var(--color-primary)" }}>
              {signName}
          </div>

        </div>

        <div>
          <div className={styles.boxContainer}>
              <div className={styles.title}>Leitura esperada</div>
              <div className='subtext'>{expected}</div>
          </div>
          <div className={styles.boxContainer}>
              <div className={styles.title}>Leitura possível</div>
              <div className='subtext'>{possible}</div>
          </div>
        </div>

        <div>
        <div className={styles.boxContainer}>
            <div className={styles.title}>Ruptura observada</div>
            <div className='subtext'>{observed}</div>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.title}>Recomendação</div>
          <div className='subtext'>{recommendations}</div>
        </div>
        </div>

        
         <div>
            <Button onClick={() => setIsMessageModalOpen(true)} id={'trash_btn'} variant={'close'} icon={<i className="bi bi-trash3"></i>} />
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
          title={'Excluir Marcação'}
          message={`Tem certeza? Você não poderá fazer alterações após a exclusão.`}
          buttonMessage={'Excluir'}
       />
       )}

    </div>
  )
}

export default EditSemiotic