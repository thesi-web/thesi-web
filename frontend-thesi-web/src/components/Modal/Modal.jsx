import React, { useState } from 'react';
import styles from './Modal.module.css';
import FormHeuristica from '../Form/FormHeuristica';
import FormSemiotica from '../Form/FormSemiotica';
import Button from '../Button/Button';
import Canva from '../Canva/Canva';

const Modal = ({ isOpen, setModalOpen, index, src, projetoId }) => {
  const [selectedTab, setSelectedTab] = useState('heuristica');

  // Semiótica
  const [signo, setSigno] = useState('');
  const handleSigno = (novoSigno) => {
    setSigno(novoSigno);
  };

  // Heurística
  const [heuristica, setHeuristica] = useState('');
  const [anotacao, setAnotacao] = useState('');
  const [recomendacao, setRecomendacao] = useState('');
  const [severidade, setSeveridade] = useState(1);

  const handleHeuristica = (event) => setHeuristica(event.target.value);
  const handleAnotacao = (event) => setAnotacao(event.target.value);
  const handleRecomendacao = (event) => setRecomendacao(event.target.value);
  const handleSeveridade = (event) => setSeveridade(event.target.value);

  // Novo: estado vindo do Canva
  const [activeRectangle, setActiveRectangle] = useState(null);
  const [imagemURL, setImagemURL] = useState(null);

  const handleSaveForm = (data) => {
    console.log('Form salvo com:', { ...data, activeRectangle, imagemURL });
    // aqui você pode chamar sua API, por exemplo
    setActiveRectangle(null);
  };

  const handleCancelForm = () => {
    setActiveRectangle(null);
  };

  return (
    <div className={styles.backdrop} onClick={setModalOpen}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.sideBarModal}>
          <div className={styles.tabButtons}>
            <Button
              variant={selectedTab === 'heuristica' ? 'activeL' : 'deactivatedL'}
              onClick={() => setSelectedTab('heuristica')}
            >
              Heurística
            </Button>
            <Button
              variant={selectedTab === 'semiotica' ? 'activeR' : 'deactivatedR'}
              onClick={() => setSelectedTab('semiotica')}
            >
              Semiótica
            </Button>
          </div>

          <div className={styles.formContainer}>
            {selectedTab === 'heuristica' && (
              <FormHeuristica
                heuristica={heuristica}
                anotacao={anotacao}
                recomendacao={recomendacao}
                severidade={severidade}
                idProjeto={projetoId}
                handleSeveridade={handleSeveridade}
                setHeuristica={setHeuristica}
                setAnotacao={setAnotacao}
                setRecomendacao={setRecomendacao}
                setSeveridade={setSeveridade}
                activeRectangle={activeRectangle}
                onSave={handleSaveForm}
                onCancel={handleCancelForm}
                imagemComMarca={imagemURL} 
              />
            )}

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
            <Canva
              imagem={src}
              setActiveRectangle={setActiveRectangle}
              setImagemURL={setImagemURL}
            />
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
