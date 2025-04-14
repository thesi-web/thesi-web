import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, setModalOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={setModalOpen}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.sideBarModal}>
                fokvpodfvk
            </div>
        <div className={styles.imageContainer}>
            <div className={styles.header}>
                <i className="bi bi-x-lg" onClick={setModalOpen}></i>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>    
      </div>
    </div>
  );
};

export default Modal;
