import React, { useState } from 'react';
import styles from './Carroussel.module.css';
import Modal from '../Modal/Modal';

const Carroussel = ({ images, projetoId, isDisabled }) => {
  const [openModalIndex, setOpenModalIndex] = useState(null);

  return (
    <div>
      <div className={'h1'}>Screens</div>
      <p>{isDisabled ? 'Screens reviewed in this project.' : 'Select a screen to start reviewing.'}</p>
      
      <div className={styles.carrousselContainer}>
        {Array.isArray(images) && images.map((img, index) => (
          <div
            key={index}
            className={`${styles.imageContainer} ${isDisabled ? styles.disabled : ''}`}
            onClick={!isDisabled ? () => setOpenModalIndex(index) : undefined}
            style={isDisabled ? { pointerEvents: 'none', opacity: 0.6 } : {}}
          >
            <img src={img} alt={`Tela ${index + 1}`} />

            {openModalIndex === index && (
              <Modal
                src={img}
                projetoId={projetoId}
                index={index + 1}
                alt={`Tela ${index + 1}`}
                isOpen={openModalIndex === index}
                setModalOpen={() => setOpenModalIndex(null)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carroussel;
