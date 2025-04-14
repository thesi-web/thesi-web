import React from 'react';
import styles from './InboxDrawer.module.css';
import Warning from '../Warning/Warning';
import { useEffect, useState } from 'react';

const InboxDrawer = ({ onClose }) => {

  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose(); // desmonta depois da animação
    }, 300); // tempo igual ao duration do animation
  };

  return (
    <div className={`${styles.drawer} ${closing ? styles.slideOut : styles.slideIn}`}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>Caixa de Entrada</div>
            <div className={styles.headerIcons}>
              <i className="bi bi-chevron-double-left" onClick={handleClose}></i>
            </div>
        </div>
      <Warning icon={<i class="bi bi-envelope-x"></i>} title={"Não há mensagens"} message={"aparecerá uma notificação aqui em caso de @menção e novos projetos"} />
    </div>
  );
};

export default InboxDrawer;
