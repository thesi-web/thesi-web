import React, { useState } from 'react';
import styles from './SidebarProject.module.css';
import ContextMenu from '../ContextMenu/ContextMenu';

const SidebarItem = ({ emoji, label, onClick, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleButtonClick = (e) => {
    e.stopPropagation(); // evita conflitos
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({ x: rect.right, y: rect.bottom });
    setMenuOpen(true);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className={styles.item} onClick={onClick}>
        <div className={styles.textContainer}>
          <span className={styles.emoji}>{emoji}</span>
          <span className={styles.label}>{label}</span>
        </div>
        <div className={styles.buttonWrapper} onClick={handleButtonClick}>
          <div className={styles.projectIcon}><i className="bi bi-three-dots"></i></div>
        </div>
      </div>

      {menuOpen && (
        <ContextMenu
          x={menuPosition.x}
          y={menuPosition.y}
          onEdit={() => {
            console.log("Edit clicked");
            closeMenu();
          }}
          onInvite={() => {
            console.log("Invite clicked");
            closeMenu();
          }}
          onDelete={onDelete}
          onClose={closeMenu}
        />
      )}
    </>
  );
};

export default SidebarItem;
