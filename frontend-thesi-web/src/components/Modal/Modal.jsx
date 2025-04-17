import React, { useState } from 'react';
import styles from './Modal.module.css';
import FormHeuristica from '../Form/FormHeuristica';
import FormSemiotica from '../Form/FormSemiotica';
import Button from '../Button/Button';

const Modal = ({ isOpen, setModalOpen, src, alt  }) => {

  const [selectedTab, setSelectedTab] = useState('heuristica');

  const [signo, setSigno] = useState('');

  const handleSigno = (novoSigno) => {
    setSigno(novoSigno);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={setModalOpen}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.sideBarModal}>
          {/* Botões de troca de aba */}
          <div className={styles.tabButtons}>
         
            <Button
              variant={`${selectedTab === 'heuristica' ? 'activeL' : 'deactivatedL'}`}
              onClick={() => setSelectedTab('heuristica')}
            >
              Heurística
            </Button>
            
          
            <Button
              variant={`${selectedTab === 'semiotica' ? 'activeR' : 'deactivatedR'}`}
              onClick={() => setSelectedTab('semiotica')}
            >
              Semiótica
            </Button>
           
          </div>

          {/* Formulário correspondente */}
          <div className={styles.formContainer}>
            {selectedTab === 'heuristica' && <FormHeuristica />}
            {selectedTab === 'semiotica' && <FormSemiotica handleSigno={handleSigno} signo={signo} />}
          </div>
        </div>

        <div className={styles.imageContainer}>
          <div className={styles.header}>
          <div className={'h2'}>🌈 A grande conquista</div>
            <i className="bi bi-x-lg" onClick={setModalOpen}></i>
          </div>
          <div className={styles.content}>
            <img src={src} alt={alt} />  {/*O COMPONENTE DE AVALIAR IMAGEM VIRÁ AQUI*/}
          </div>
          <div className={styles.buttonContainer}>
            <Button icon={<i class="bi bi-arrow-right-circle"></i>} variant='transparent'>Concluir Avaliação</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
