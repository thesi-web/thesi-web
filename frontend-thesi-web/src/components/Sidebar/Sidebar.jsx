import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import SidebarItem from '../SidebarItem/SidebarItem';
import SidebarProject from '../SidebarProject/SidebarProject';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Warning from '../Warning/Warning';

const Sidebar = ({ show, onOpenInbox, onClose }) => {

  const navigate = useNavigate();

  
  const handleClick = (id) => {
    navigate(`/project/${id}`);
  };

  const [totalProjetos, setTotalProjetos] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/all', {
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
          
      <div className={styles.headerIcons}>
        <div className={styles.logo}>thesi</div>
        <div className={styles.iconContainer}>
          <div className={styles.icons} onClick={onClose} ><i className="bi bi-chevron-double-left"/></div>
          <Link to="/create/project" ><div className={styles.icons}><i className="bi bi-pencil-square"></i></div></Link>
        </div>
      </div>
      
      <div>
      <Link to="/home" ><SidebarItem label={"Página Inicial"} icon={<i className="bi bi-cup"></i>} /></Link>
        
        <SidebarItem 
          label={"Caixa de Entrada"} 
          icon={<i className="bi bi-mailbox"></i>} 
          onClick={onOpenInbox}
        />
      </div>

        <div className={styles.title}>Projetos</div>

      <div className={styles.projectContainer} >
        {totalProjetos.length > 0 ? (
          totalProjetos.map((projeto, index) => (
            <div key={index} onClick={() => handleClick(projeto.id_projeto)}>
              <SidebarProject label={projeto.nm_projeto} emoji={"🌈"} />
            </div>
          ))
        ) : (
          < Warning icon={<i className="bi bi-stars"></i>} title={"Não há projetos"} message={"seus projetos aparecerão aqui"} />
        )}
      </div>

      <div className={styles.footerContainer}>
        <SidebarItem label={"Configurações"} icon={<i className="bi bi-gear"></i>} />
        <SidebarItem label={"Lixeira"} icon={<i className="bi bi-trash3"></i>} />
        <SidebarItem label={"Convidar membros"} icon={<i className="bi bi-person-plus"></i>} />
        <div className={styles.footerIcons}>
          <i className="bi bi-calendar2-check"></i>
          <i className="bi bi-question-circle"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
