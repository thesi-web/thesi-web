import React, { useState, useEffect } from 'react';
import styles from './Trash.module.css';
import Button from '../components/Button/Button'
import MessageModal from '../components/Modal/MessageModal';
import Warning from '../components/Warning/Warning';

const Trash = () => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const [trash, setTrash] = useState([]);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [modalAction, setModalAction] = useState(null); 


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/project/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        // Atualiza a lista após deletar
        fetchTrash();
        setIsMessageModalOpen(false); 
        setSelectedProjectId(null); 
      } else {
        console.error('Erro ao deletar o projeto');
      }
    } catch (error) {
      console.error('Erro ao deletar o projeto:', error);
    }
  };

  const fetchTrash = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/trash`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setTrash(data);
    } catch (error) {
      console.error('Erro ao buscar os projetos:', error);
    }
  };

  const handleRestore = async (idProjeto) => {
  try {
    const response = await fetch(`${apiUrl}/api/restore/trash/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ idProjeto: `${idProjeto}` }), // caso seu backend espere no body
    });

    if (!response.ok) {
      throw new Error("Erro restaurar projeto");
    } else {
      fetchTrash();
      setIsMessageModalOpen(false); 
      setSelectedProjectId(null); 
    }

  } catch (error) {
    console.error("Erro ao mover para a lixeira:", error);
  }
  };

  // Buscar os projetos da lixeira ao carregar a página
  useEffect(() => {
    fetchTrash();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}> Lixeira </div>
      <p>Um projeto na lixeira está disponível para recuperação durante 30 dias. Após esse período ele será deletado permanentemente.</p>
      {trash.length === 0 ? (
        <div className={styles.tableWarning}>
          <Warning 
            icon = {<i className="bi bi-patch-check-fill"></i>} 
            title={'Continue assim!'} 
            message={'Nada por aqui. Sua lixeira está limpinha.'}/>
        </div>
      ) : (
        <div className={styles.table}>
          <div className={styles.header}>
            Nome do projeto
          </div>
          {trash.map((projeto) => (
            <div key={projeto.id_projeto} className={styles.item}>
              <div className={styles.itemTitle}>{projeto.nm_projeto}</div>
              <div className={styles.icons}>
                <Button 
                variant={'icon'} 
                icon={<i className="bi bi-escape"></i>} 
                onClick={() => {
                    setSelectedProjectId(projeto.id_projeto);
                    setModalAction("restore");
                    setIsMessageModalOpen(true);
                }} 
                />

                <Button 
                variant={'iconDanger'} 
                icon={<i className="bi bi-clipboard-x"></i>} 
                onClick={() => {
                    setSelectedProjectId(projeto.id_projeto);
                    setModalAction("delete");
                    setIsMessageModalOpen(true);
                }} 
                />
              </div>
            </div>
          ))}
        </div>
      )}

        {isMessageModalOpen && (
        <MessageModal
            isMessageOpen={isMessageModalOpen}
            setMessageModalOpen={() => setIsMessageModalOpen(false)}
            onClick={() => {
            if (modalAction === "restore") {
                handleRestore(selectedProjectId);
            } else if (modalAction === "delete") {
                handleDelete(selectedProjectId);
            }
            }}
            title={modalAction === "restore" ? "Recuperar projeto" : "Excluir projeto"}
            message={
            modalAction === "restore"
                ? "Esse projeto está na lixeira. Deseja trazê-lo de volta?"
                : "Essa ação é irreversível. Deseja excluir o projeto permanentemente?"
            }
            buttonMessage={modalAction === "restore" ? "Recuperar" : "Excluir"}
        />
        )}


    </div>
  );
};

export default Trash;
