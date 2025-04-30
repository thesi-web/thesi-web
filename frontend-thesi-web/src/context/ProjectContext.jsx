import React, { createContext, useContext, useState } from 'react';

const ProjectsContext = createContext();

const apiUrl = process.env.REACT_APP_API_URL;

export const useProjects = () => {
  return useContext(ProjectsContext);
};

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/all`, {
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
