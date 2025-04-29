import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import styles from './InboxDrawer.module.css';
import Warning from '../Warning/Warning';
import Message from '../Message/Message';

const socket = io('http://localhost:3000'); // onde estiver seu socket server

const InboxDrawer = ({ onClose, closing }) => {

  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    // Função para buscar as notificações antigas
    const fetchNotificacoes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/notifications/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setNotificacoes(data);
      } catch (error) {
        console.error('Erro ao buscar notificações:', error);
      }
    };

    fetchNotificacoes(); // Busca notificações ao abrir o drawer

    if (socket) {
      socket.on('notificacaoConsolidacao', (data) => {
        setNotificacoes((prev) => [...prev, data]); // Adiciona nova notificação na lista
      });
    }

    return () => {
      if (socket) {
        socket.off('notificacaoConsolidacao');
      }
    };
  }, []);

  return (
    <div className={`${styles.drawer} ${closing ? styles.slideOut : styles.slideIn}`}>
      <div className={styles.headerContainer}>
        <div className={'h3'}>Inbox</div>
        <div className={styles.headerIcons} onClick={onClose}>
          <i className="bi bi-chevron-double-left"></i>
        </div>
      </div>

      <div className={styles.notificacoesContainer}>
        {notificacoes.length === 0 ? (     
          <Warning 
            icon={<i className="bi bi-envelope-x"></i>} 
            title={"No messages"}
            message={"A notification will appear here in case of @mentions and new projects"}
          />
        ) : (
          notificacoes.map((n, idx) => (
            <div key={idx} className={styles.notificacao}>
              <Message
                nomeUsuario={n.nm_usuario}
                nome={n.nm_professor}
                nomeProjeto={n.nm_projeto}
                assunto={'corrected a project.'}
                mensagem={n.ds_mensagem}
                link={n.ds_link}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InboxDrawer;
