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
          position: 'fixed',
          top: y,
          left: x,
          background: 'white',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          color: 'var(--color-heading)',
          border: 'solid 1px var(--color-transparency)',  
          padding: '0.3em',
          zIndex: 9999,
        }}
        onClick={onClose} // fecha ao clicar em qualquer item
      >
    
      <div className={styles.menuItem} onClick={onEdit}>Edit</div>
      <div className={styles.menuItem} onClick={onInvite}>Invite</div>
      <div className={`${styles.menuItem} ${styles.delete}`} onClick={onDelete}>Move to trash</div>
      </div>
    );
  
    return ReactDOM.createPortal(menu, document.body);
  };
  
  export default ContextMenu;