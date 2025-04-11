import React from 'react';
import styles from './SidebarProject.module.css';

const SidebarItem = ({ emoji, label, onClick }) => {
  return (
    <div className={styles.item} onClick={onClick}>
      <span className={styles.emoji}>{emoji}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
};

export default SidebarItem;
