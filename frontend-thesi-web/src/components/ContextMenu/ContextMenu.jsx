import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './ContextMenu.module.css';

const ContextMenu = ({ x, y, onEdit, onInvite, onDelete, onClose }) => {

    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            onClose();
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [onClose]);

    const menu = (
      <div
        ref={menuRef}
        className={styles.menu}
        style={{
          top: y,
          left: x,
        }}
        onClick={onClose} // fecha ao clicar em qualquer item
      >
    
      <div className={styles.menuItem} onClick={onEdit}><i className="bi bi-pencil-square"></i><div className={styles.label}>Editar</div></div>
      <div className={styles.menuItem} onClick={onInvite}><i className="bi bi-person-plus"></i><div className={styles.label}>Convidar</div></div>
      <div className={styles.linha}></div>
      <div className={`${styles.menuItem} ${styles.delete}`} onClick={onDelete}><i className="bi bi-trash3"></i><div className={styles.label}>Apagar</div></div>
      </div>
    );
  
    return ReactDOM.createPortal(menu, document.body);
  };
  
  export default ContextMenu;