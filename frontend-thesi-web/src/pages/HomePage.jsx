import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import InboxDrawer from '../components/Sidebar/InboxDrawer';
import styles from './HomePage.module.css'

const HomePage = () => {
  
  const [showSidebar, setShowSidebar] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  
  return (
    <div className={styles.sideBarContainer}>
      
      {/* Sidebar com função de abrir a caixa */}
      <Sidebar show={showSidebar} onOpenInbox={() => setShowInbox(true)} />

      {/* InboxDrawer fora da Sidebar, aparece por cima do conteúdo, abaixo da nav */}
      {showInbox && <InboxDrawer onClose={() => setShowInbox(false)} />}

      <div style={{ padding: '20px' }}>
        <button onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? 'Fechar' : 'Mostrar'}
        </button>
      </div>
      
    </div>
  );
};

export default HomePage;