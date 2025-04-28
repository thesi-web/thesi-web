import React, { createContext, useContext, useState } from 'react';

const ProjectsContext = createContext();

export const useProjects = () => {
  return useContext(ProjectsContext);
};

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/all', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Erro ao buscar os projetos:', error);
    }
  };

  return (
    <ProjectsContext.Provider value={{ projects, fetchProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};
