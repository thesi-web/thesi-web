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

        {/* Botão de adicionar imagem */}
        {!isDisabled && images.length < 5 && (
          <div
            className={`${styles.imageContainerAdd}`}
            onClick={() => console.log("Abrir modal de upload de imagem")}
          >
            <div className={styles.adicionarContainer}>
              <i className="bi bi-plus-circle-fill"></i>
              <div className={styles.adicionarContainerText}>Adicionar imagem</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carroussel;
