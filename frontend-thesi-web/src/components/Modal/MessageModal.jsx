import React, { useState, useRef } from 'react';
import styles from './MessageModal.module.css';
import Button from '../Button/Button';
import Canva from '../Canva/Canva';

const MessageModal = ({ isMessageOpen, setMessageModalOpen, onClick, title, message, buttonMessage }) => {
 
  return (
    <div className={styles.backdrop} onClick={setMessageModalOpen}>

      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        <div className={styles.title}>
          <div> {title} </div>
          <Button variant={'close'} onClick={setMessageModalOpen} icon={<i className="bi bi-x-lg"></i>} />
        </div>

        <div className={styles.content} >
            <div className='title' ><i className="bi bi-exclamation-circle"></i></div>
            <div className='subtext' >{message}</div>
        </div>
        
        <div className={styles.iconsContainer} >
            <Button variant={'transparent'} onClick={setMessageModalOpen} > Cancelar </Button>
            <Button variant={'secondary'} onClick={onClick} > {buttonMessage} </Button>
        </div>

      </div>
    </div>
  );
};

export default MessageModal;
