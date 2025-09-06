import { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import InboxDrawer from '../components/Sidebar/InboxDrawer';
import styles from './LayoutComSidebar.module.css';

const LayoutComSidebar = () => {
  const [showInbox, setShowInbox] = useState(false);
  const [closingInbox, setClosingInbox] = useState(false);
  const canvasRef = useRef(null);

  const handleCloseInbox = () => {
    setClosingInbox(true);
    setTimeout(() => {
      setShowInbox(false);  
      setClosingInbox(false); 
    }, 300);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let gradientOffset = 0;

    const animate = () => {
      gradientOffset += 0.002;
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `rgba(245, 245, 245, 0.05)`); // #E8E8E8 bem translúcido
      gradient.addColorStop(0.5, `rgba(235, 235, 235, 0.1)`); // cinza médio translúcido
      gradient.addColorStop(1, `rgba(245, 245, 245, 0.05)`); // volta pro tom claro




      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='view'>
      <canvas 
        ref={canvasRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        }}
      />
      <div className={styles.container}>
        <Sidebar onOpenInbox={() => setShowInbox(true)} />

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
