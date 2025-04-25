import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import InboxDrawer from '../components/Sidebar/InboxDrawer';
import styles from './LayoutComSidebar.module.css';
import Button from '../components/Button/Button';

const LayoutComSidebar = () => {

const [showInbox, setShowInbox] = useState(false);
const [closingInbox, setClosingInbox] = useState(false);
const [showSidebar, setShowSidebar] = useState(false);

const handleCloseInbox = () => {
  setClosingInbox(true);
  setTimeout(() => {
    setShowInbox(false);  // desmonta de verdade aqui
    setClosingInbox(false); // reseta o estado de animação
  }, 300); // igual ao tempo da animação
};

const navigate = useNavigate();

const handleLogout = async () => {
  await fetch("http://localhost:3000/api/logout", { method: "POST" });
  localStorage.removeItem("token");
  navigate("/");
};


  return (
    <div className={styles.sideBarContainer}>

      <Sidebar 
        show={showSidebar} 
        onOpenInbox={() => setShowInbox(true)}
        onClose={() => {
          setShowSidebar(false);
          setShowInbox(false); // fecha a inbox junto
        }}
        />
        
      {/* Caixa de entrada */}
      {showInbox && (
        <InboxDrawer 
          onClose={handleCloseInbox}
          closing={closingInbox}
        />
      )}

      <div className={styles.navContainer}>
        <div className={styles.icons} onClick={() => setShowSidebar(true)}>
          <i className="bi bi-chevron-double-right"></i>
        </div>
        <div><Button variant={'transparent'} onClick={handleLogout}> Logout</Button></div>
      </div>
        
      <div className={styles.content}>
        <Outlet />
      </div>

      
    </div>
  );
};

export default LayoutComSidebar;
