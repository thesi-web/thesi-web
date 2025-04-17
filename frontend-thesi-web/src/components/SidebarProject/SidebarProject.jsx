import React from 'react';
import styles from './SidebarProject.module.css';
import Button from '../Button/Button'

const SidebarItem = ({ emoji, label, onClick }) => {
  return (
    <div className={styles.item} onClick={onClick}>
      <div className={styles.textContainer} >
        <span className={styles.emoji}>{emoji}</span>
        <span className={styles.label}>{label}</span>
      </div>
      <div className={styles.buttonWrapper}>
        <div className={styles.projectIcon}><i className="bi bi-three-dots"></i></div>
      </div>
    </div>
  );
};

export default SidebarItem;
