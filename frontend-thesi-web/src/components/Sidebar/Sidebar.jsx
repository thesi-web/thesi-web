import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import SidebarItem from '../SidebarItem/SidebarItem';
import SidebarProject from '../SidebarProject/SidebarProject';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Warning from '../Warning/Warning';

const Sidebar = ({onOpenInbox}) => {

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const handleLogout = async () => {
    await fetch(`${apiUrl}/api/logout`, { method: "POST" });
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleClick = (id) => {
    navigate(`/project/${id}`);
  };

  const handleDelete = async (id) => {

    try {
      const response = await fetch(`${apiUrl}/api/project/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        navigate('/home'); 
        fetchProjects();
      } else {
      }
    } catch (error) {
      console.error('Erro ao deletar o projeto:', error);
    }
  };

  const [totalProjetos, setTotalProjetos] = useState([]);
  

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/all`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      const data = await response.json();
      setTotalProjetos(data); // Atualiza o estado com os projetos da API
    } catch (error) {
      console.error('Erro ao buscar os projetos:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <div className={styles.logo}>
          Thesi UX
        </div>
      </div>
      
      <div className={styles.section}>
      <Link to="/home" ><SidebarItem label={"Início"} icon={<i className="bi bi-cup"></i>} /></Link>  
      <SidebarItem 
        label={"Notificações"} 
        icon={<i className="bi bi-mailbox"></i>} 
        onClick={onOpenInbox}
      />
      <Link to="/create/project" ><SidebarItem label={"Novo projeto"} icon={<i className="bi bi-plus-circle"></i>} /></Link>
      </div>

      <div className={styles.title}>
        Projetos
      </div>

      <div className={styles.projectContainer} >
        {totalProjetos.length > 0 ? (
          totalProjetos.map((projeto, index) => (
            <div key={index} onClick={() => handleClick(projeto.id_projeto)}>
              <SidebarProject label={projeto.nm_projeto} onDelete={() => handleDelete(projeto.id_projeto)}  />
            </div>
          ))
        ) : (
          < Warning icon={<i className="bi bi-stars"></i>} message={"seus projetos aparecerão aqui."} />
        )}
      </div>

      <div className={styles.footer}>
        <SidebarItem label={"Configurações"} icon={<i className="bi bi-gear"></i>} />
        <SidebarItem label={"Lixeira"} icon={<i className="bi bi-trash3"></i>} />
        <SidebarItem label={"Sair"} icon={<i className="bi bi-box-arrow-right"></i>} onClick={handleLogout} />
      </div>

      <div className={styles.footerIcons}>
        <div className={styles.icons}><i className="bi bi-calendar2-check"></i></div>
        <div className={styles.icons}><i className="bi bi-question-circle"></i></div>
      </div>
    </div>
  );
};

export default Sidebar;
