import React, { useState } from 'react';
import styles from './Modal.module.css';
import FormHeuristica from '../Form/FormHeuristica';
import FormSemiotica from '../Form/FormSemiotica';
import Button from '../Button/Button';
import Canva from '../Canva/Canva';

const Modal = ({ isOpen, setModalOpen, index, src }) => {
  const [selectedTab, setSelectedTab] = useState('heuristica');
  const [signo, setSigno] = useState('');

  const [activeRectangle, setActiveRectangle] = useState(null);
  const [marks, setMarks] = useState([]);

  const handleSigno = (novoSigno) => {
    setSigno(novoSigno);
  };

  const handleNewMark = (rectangle) => {
    setMarks((prev) => [...prev, rectangle]);
    setActiveRectangle(rectangle);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={setModalOpen}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.sideBarModal}>
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

          <div className={styles.formContainer}>
            {selectedTab === 'heuristica' && <FormHeuristica />}
            {selectedTab === 'semiotica' && (
              <FormSemiotica handleSigno={handleSigno} signo={signo} />
            )}
          </div>
        </div>

        <div className={styles.imageContainer}>
          <div className={styles.header}>
            <div className={'h2'}>{`Tela ${index}`}</div>
            <i className="bi bi-x-lg" onClick={setModalOpen}></i>
          </div>
          <div className={styles.content}>
            <Canva imagemURL={src} />
          </div>
          <div className={styles.buttonContainer}>
            <Button icon={<i className="bi bi-arrow-right-circle"></i>} variant="transparent">
              Concluir Avaliação
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
