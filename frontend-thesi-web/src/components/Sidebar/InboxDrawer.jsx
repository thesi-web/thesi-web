import React from 'react';
import styles from './InboxDrawer.module.css';
import Warning from '../Warning/Warning';

const InboxDrawer = ({ onClose, closing }) => {
  return (
    <div className={`${styles.drawer} ${closing ? styles.slideOut : styles.slideIn}`}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>Caixa de Entrada</div>
        <div className={styles.headerIcons} onClick={onClose}>
          <i className="bi bi-chevron-double-left"></i>
        </div>

      </div>
      <Warning 
        icon={<i className="bi bi-envelope-x"></i>} 
        title={"Não há mensagens"} 
        message={"aparecerá uma notificação aqui em caso de @menção e novos projetos"} 
      />
    </div>
  );
};

export default InboxDrawer;
