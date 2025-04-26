import React, { useState, useRef } from 'react';
import styles from './MessageModal.module.css';
import Button from '../Button/Button';
import Canva from '../Canva/Canva';

const MessageModal = ({ isMessageOpen, setMessageModalOpen, onClick }) => {
 
  return (
    <div className={styles.backdrop} onClick={setMessageModalOpen}>

      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        <div className={styles.title}>
          <div className='h3'> Submit Project </div>
          <div className={styles.icon} onClick={setMessageModalOpen} ><i className="bi bi-x-lg"></i></div>
        </div>

        <div className={styles.content} >
            <div className='title' >🐣</div>
            <div className='subtext' >Are you sure? You won't be able to make changes after submission.</div>
        </div>
        
        <div className={styles.iconsContainer} >
            <Button variant={'transparent'} onClick={setMessageModalOpen} > Cancel </Button>
            <Button variant={'secondary'} onClick={onClick} > Submit </Button>
        </div>

      </div>
    </div>
  );
};

export default MessageModal;
