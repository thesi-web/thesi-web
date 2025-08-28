import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import InboxDrawer from '../components/Sidebar/InboxDrawer';
import styles from './LayoutComSidebar.module.css';

const LayoutComSidebar = () => {

const [showInbox, setShowInbox] = useState(false);
const [closingInbox, setClosingInbox] = useState(false);

const handleCloseInbox = () => {
  setClosingInbox(true);
  setTimeout(() => {
    setShowInbox(false);  // desmonta de verdade aqui
    setClosingInbox(false); // reseta o estado de animação
  }, 300); // igual ao tempo da animação
};

  return (
    <div className='view'>
      <div className={styles.container}>
        <Sidebar onOpenInbox={() => setShowInbox(true)}/>
          
        {/* Caixa de entrada */}
        {showInbox && (
          <InboxDrawer 
            onClose={handleCloseInbox}
            closing={closingInbox}
          />
        )}

      <div className={styles.content}>
        <Outlet />
      </div>
      </div>
    </div>
   
  );
};

export default LayoutComSidebar;
