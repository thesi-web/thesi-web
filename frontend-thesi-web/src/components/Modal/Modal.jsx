import React, { useState, useRef } from 'react';
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
  const [esperada, setEsperada] = useState('');
  const [possivel, setPossivel] = useState('');
  const [quebra, setQuebra] = useState('');
  const [recomendacaoSemiotica, setRecomendacaoSemiotica] = useState('');

  const handleEsperada = (event) => setEsperada(event.target.value);
  const handlePossivel =  (event) => setPossivel(event.target.value);
  const handleQuebra = (event) => setQuebra(event.target.value);
  const handleRecomendacaoSemiotica =  (event) => setRecomendacaoSemiotica(event.target.value);

  // Heurística
  const [heuristica, setHeuristica] = useState(0);
  const [anotacao, setAnotacao] = useState('');
  const [recomendacao, setRecomendacao] = useState('');
  const [severidade, setSeveridade] = useState(1);

  const handleHeuristica = (event) => setHeuristica(event.target.value);
  const handleAnotacao = (event) => setAnotacao(event.target.value);
  const handleRecomendacao = (event) => setRecomendacao(event.target.value);
  const handleSeveridade = (valor) => {
    setSeveridade(valor);
  };
  

  // Novo: estado vindo do Canva
  const [activeRectangle, setActiveRectangle] = useState(null);
  const [imagemURL, setImagemURL] = useState(null);

  const handleSaveForm = (data) => {
    setHeuristica('');
    setAnotacao('');
    setRecomendacao('');
    setSeveridade(1);
    setEsperada('');
    setPossivel('');
    setQuebra('');
    setRecomendacaoSemiotica('');
    //setActiveRectangle(null);
  };

  const handleCancelForm = () => {
    setActiveRectangle(null);
  };

  const handleLimparRetangulos = () => {
    if (canvaRef.current) {
      canvaRef.current.limparRetangulos(); // <-- Chama a função do filho via ref
    }
  };

  const canvaRef = useRef(null);

  return (
    <div className={styles.backdrop} onClick={setModalOpen}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.title}>{`Tela ${index}`}</div>
          <div onClick={setModalOpen} className={styles.closeModal} > <i className="bi bi-x-lg"></i> </div>
        </div>
      <div className={styles.container}>
                     
        <div className={styles.teste}>
          <div className={styles.menu}>
            <div className={styles.explanation}><p>Você pode desenhar retângulos na tela abaixo para destacar o componente que viola uma restrição heurística ou representa um signo.</p></div>
            <div><Button variant='message'  onClick={handleLimparRetangulos}>Limpar Tela</Button></div>
          </div> 
       
          <div className={styles.imageContainer}>
            <div className={styles.content}>
              <Canva
                ref={canvaRef}
                imagem={src}
                setActiveRectangle={setActiveRectangle}
                setImagemURL={setImagemURL}
              />
            </div>
          </div>
         </div>

        <div className={styles.sideBarModal}>
      
          <div className={styles.tabButtons}>
            <Button
              variant={selectedTab === 'heuristica' ? 'highcontrast' : 'lowcontrast'}
              onClick={() => setSelectedTab('heuristica')}
            >
              Heurística
            </Button>
            <Button
              variant={selectedTab === 'semiotica' ? 'highcontrast' : 'lowcontrast'}
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
              <FormSemiotica 
                idProjeto={projetoId}
                handleSigno={handleSigno} 
                signo={signo} 
                esperada={esperada}
                setEsperada={setEsperada}
                possivel={possivel}
                setPossivel={setPossivel}
                quebra={quebra}
                setQuebra={setQuebra}
                recomendacaoSemiotica={recomendacaoSemiotica}
                setRecomendacaoSemiotica={setRecomendacaoSemiotica}
                activeRectangle={activeRectangle}
                onSave={handleSaveForm}
                onCancel={handleCancelForm}
                imagemComMarca={imagemURL} 
              />
            )}
          </div>
        </div>

      </div>
        
        

      </div>
    </div>
  );
};

export default Modal;





