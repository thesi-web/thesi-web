import React from 'react';
import styles from './SidebarItem.module.css';

const SidebarItem = ({ icon, label, onClick }) => {
  return (
    <div className={styles.item} onClick={onClick}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
};

export default SidebarItem;
