import React from 'react';
import styles from './SidebarItem.module.css';

const SidebarItem = ({ icon, label, onClick }) => {
  return (
    <div className={styles.item} onClick={onClick}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default SidebarItem;
