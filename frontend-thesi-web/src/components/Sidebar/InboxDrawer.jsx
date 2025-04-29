import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import styles from './InboxDrawer.module.css';
import Warning from '../Warning/Warning';

const socket = io('http://localhost:3000'); // ou onde estiver seu socket server

const InboxDrawer = ({ onClose, closing }) => {

  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on('notificacaoConsolidacao', (data) => {
        setNotificacoes((prev) => [...prev, data]);
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
              <a href={n.link}>{n.mensagem}</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InboxDrawer;
