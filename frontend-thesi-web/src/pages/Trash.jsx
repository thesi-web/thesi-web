import React from 'react'

const Trash = () => {
    
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const handleDelete = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/api/project/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        });
    /*
        if (response.ok) { 
        fetchProjects();
        } else {
        }
    */
    } catch (error) {
        console.error('Erro ao deletar o projeto:', error);
    }
    };
    
  return (
    <div>Trash</div>
  )
}

export default Trash