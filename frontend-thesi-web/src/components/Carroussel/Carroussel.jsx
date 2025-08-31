import React, { useState } from 'react';
import styles from './Carroussel.module.css';
import Modal from '../Modal/Modal';
import MessageModal from '../Modal/MessageModal';

const Carroussel = ({ images, projetoId, isDisabled, onUpload }) => {
  
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const fileInputRef = React.useRef(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      onUpload(files); // chama o Project para enviar os arquivos
    }
  };

  const onDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/image`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idImage: `${id}` }),
      });

      if (response.ok) {
        setIsMessageModalOpen(false); 
        
      } else {
        console.error('Erro ao deletar a imagem');
      }
    } catch (error) {
      console.error('Erro ao deletar a imagem', error);
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
            <img src={img.ds_caminho} alt={`Tela ${index + 1}`} />

            {/* ícone de lixeira no hover */}
            {!isDisabled && (
              <i 
                className={`bi bi-trash-fill ${styles.trashIcon}`} 
                onClick={(e) => {
                  e.stopPropagation();
                  setImageToDelete(img); 
                  setIsMessageModalOpen(true);
                }} 
              ></i>
            )}

            {openModalIndex === index && (
              <Modal
                src={img.ds_caminho}
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

      {isMessageModalOpen && imageToDelete && (
      <MessageModal
        isMessageOpen={isMessageModalOpen}
        setMessageModalOpen={() => {
          setIsMessageModalOpen(false);
          setImageToDelete(null); // limpa após fechar
        }}
        onClick={() => onDelete(imageToDelete.id_imagem)}
        title={'Excluir Imagem'}
        message={`Você tem certeza que deseja excluir esta imagem permanentemente?`}
        buttonMessage={'Excluir'}
      />
    )}

    </div>
  );
};

export default Carroussel;
