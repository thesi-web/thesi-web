import React, { useState } from 'react';
import styles from './Carroussel.module.css';
import Modal from '../Modal/Modal';

const Carroussel = ({ images }) => {
  const [openModalIndex, setOpenModalIndex] = useState(null); // null = nenhum modal aberto

  return (
    <div>
      <div className={'h1'}>
        Telas
      </div>
        <p>Clique em uma tela para iniciar a avaliação</p>
      <div className={styles.carrousselContainer}>
        {Array.isArray(images) && images.map((img, index) => (
          <div
            key={index}
            className={styles.imageContainer}
            onClick={() => setOpenModalIndex(index)} // abre o modal correspondente
          >
            <img src={img} alt={`Tela ${index + 1}`} />

            {/* modal só aparece quando o índice atual está aberto */}
            {openModalIndex === index && (
              <Modal src={img} index={index + 1} alt={`Tela ${index + 1}`} isOpen={openModalIndex === index} setModalOpen={() => setOpenModalIndex(null)}>
              </Modal>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carroussel;
