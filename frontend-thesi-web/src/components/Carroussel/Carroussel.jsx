import React, { useState } from 'react';
import styles from './Carroussel.module.css';
import Modal from '../Modal/Modal';

const Carroussel = ({ images, projetoId, isDisabled, onUpload  }) => {
  
  const [openModalIndex, setOpenModalIndex] = useState(null);

  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      onUpload(files); // chama o Project para enviar os arquivos
    }
  };

  return (
    <div>
      <div className={styles.title}>Telas</div>
      <p>{isDisabled ? 'Telas avaliadas.' : 'Selecione uma tela pra começar a avaliar.'}</p>
      
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
            onClick={() => fileInputRef.current.click()}
          >
            <div className={styles.adicionarContainer}>
              <i className="bi bi-plus-circle-fill"></i>
              <div className={styles.adicionarContainerText}>Adicionar imagem</div>
            </div>
          </div>
        )}

        {/* input escondido */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          multiple
          onChange={handleFileChange}
        />

      </div>
    </div>
  );
};

export default Carroussel;
