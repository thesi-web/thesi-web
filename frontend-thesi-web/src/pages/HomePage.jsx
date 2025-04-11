import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

const HomePage = () => {
  
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar show={showSidebar} />
      <div style={{ padding: '20px' }}>
        <button onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? 'Fechar' : 'Mostrar'}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
