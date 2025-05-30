import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import SidebarItem from '../SidebarItem/SidebarItem';
import SidebarProject from '../SidebarProject/SidebarProject';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Warning from '../Warning/Warning';

const Sidebar = ({ show, onOpenInbox, onClose }) => {

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  
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
    <div className={show ? styles.active : styles.disable}>
      <div className={styles.container}>
        <div className={styles.headerIcons}>
          <div className={styles.logo}>Thesi</div>
          <div className={styles.iconContainer}>
            <div className={styles.icons} onClick={onClose} ><i className="bi bi-chevron-double-left"/></div>
            <Link to="/create/project" ><div className={styles.icons}><i className="bi bi-pencil-square"></i></div></Link>
          </div>
        </div>
        
        <div>
        <Link to="/home" ><SidebarItem label={"Home"} icon={<i className="bi bi-cup"></i>} /></Link>  
        <SidebarItem 
          label={"Inbox"} 
          icon={<i className="bi bi-mailbox"></i>} 
          onClick={onOpenInbox}
        />
        <Link to="/create/project" ><SidebarItem label={"New Project"} icon={<i className="bi bi-plus-circle"></i>} /></Link>
        </div>

      
          


        <div className={styles.title}>Projects</div>

        <div className={styles.projectContainer} >
          {totalProjetos.length > 0 ? (
            totalProjetos.map((projeto, index) => (
              <div key={index} onClick={() => handleClick(projeto.id_projeto)}>
                <SidebarProject label={projeto.nm_projeto} emoji={"🌈"} onDelete={() => handleDelete(projeto.id_projeto)}  />
              </div>
            ))
          ) : (
            < Warning icon={<i className="bi bi-stars"></i>} message={"your projects will appear here"} />
          )}
        </div>

        <div className={styles.footerContainer}>
          <SidebarItem label={"Settings"} icon={<i className="bi bi-gear"></i>} />
          <SidebarItem label={"Trash"} icon={<i className="bi bi-trash3"></i>} />
          <SidebarItem label={"Invite members"} icon={<i className="bi bi-person-plus"></i>} />
          <div className={styles.footerIcons}>
            <div className={styles.icons}><i className="bi bi-calendar2-check"></i></div>
            <div className={styles.icons}><i className="bi bi-question-circle"></i></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
