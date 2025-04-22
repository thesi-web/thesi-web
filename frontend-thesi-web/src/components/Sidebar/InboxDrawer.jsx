import React from 'react';
import styles from './InboxDrawer.module.css';
import Warning from '../Warning/Warning';

const InboxDrawer = ({ onClose, closing }) => {
  return (
    <div className={`${styles.drawer} ${closing ? styles.slideOut : styles.slideIn}`}>
      <div className={styles.headerContainer}>
        <div className={'h3'}>Inbox</div>
        <div className={styles.headerIcons} onClick={onClose}>
          <i className="bi bi-chevron-double-left"></i>
        </div>

      </div>
      <Warning 
        icon={<i className="bi bi-envelope-x"></i>} 
        title={"No messages"}
        message={"A notification will appear here in case of @mentions and new projects"}
      />
    </div>
  );
};

export default InboxDrawer;
