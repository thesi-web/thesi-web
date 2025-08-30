import InputText from '../InputText/InputText';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import styles from './StepOneForm.module.css'
import { useState, useEffect } from 'react';

export default function StepOneForm({ projectData, setProjectData }) {

  const platforms = ['Web', 'Mobile', 'Desktop'];
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.length >= 2) {
        const token = localStorage.getItem("token");
          fetch(`${apiUrl}/api/search/user?search=${encodeURIComponent(searchTerm)}`, {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          })
            .then(res => {
              if (!res.ok) throw new Error("Erro ao buscar usuários");
              return res.json();
            })
            .then(data => {
              setSearchResults(data);
            })
            .catch(err => console.error("Erro:", err));
      } else {
        setSearchResults([]);
      }
    }, 300); // debounce: espera 300ms após digitar
  
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleSelectUser = (user) => {
    if (selectedParticipants.find((p) => p.id === user.id)) return;
  
    const updated = [...selectedParticipants, user];
    setSelectedParticipants(updated);
    setProjectData({ ...projectData, participants: updated.map(p => p.id) });
    setSearchTerm('');
    setSearchResults([]);
  };
  

  const handleChange = (key) => (e) => {
    setProjectData({ ...projectData, [key]: e.target.value });
  };

  const handleRemoveUser = (userId) => {
    const updatedParticipants = selectedParticipants.filter(user => user.id !== userId);
    setSelectedParticipants(updatedParticipants);
    setProjectData({ ...projectData, participants: updatedParticipants.map(p => p.id) });
  };  

  return (
    <>
      <div className={styles.container}>
        <div>
          <InputText label="Nome do projeto" type="text" placeholder="digite o nome do projeto" onChange={handleChange('name')} value={projectData.name} required />
          
          <label>Objetivo</label>
          <TextArea placeholder="descreva de sucintamente o objetivo do projeto" onChange={handleChange('objective')} value={projectData.objective} maxLength={100} required />
          
          <label>Tipo de plataforma</label>
            <div className={styles.buttonContainer}>
              {platforms.map((label) => (
                <Button
                  key={label}
                  variant={projectData.platform === label ? "highcontrast" : "lowcontrast"}
                  onClick={() => setProjectData({ ...projectData, platform: label })}
                >
                  {label}
                </Button>
              ))}
          </div>
        </div>

        <div className={styles.containerName}>
          <div className={styles.namesContainer}>
            <InputText label='Participantes' type="text" placeholder="digite o e-mail do participante"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchResults.length > 0 && (
                <div className={styles.searchResults}>
                  {searchResults.map((user) => (
                    <div className={styles.name} key={user.id} onClick={() => handleSelectUser(user)}>
                      {user.email}
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>

          {selectedParticipants.length > 0 && (
            <div className={styles.selectedList}>
              {selectedParticipants.map((user) => (
                <div key={user.id} className={styles.selectedParticipant}>
                  <div>
                    <div className={styles.title} >{user.name}</div>
                    <p className={styles.email} >{user.email}</p>
                  </div>
                  <Button variant={'closeList'} icon={<i className="bi bi-x-circle-fill"></i>} onClick={() => handleRemoveUser(user.id)} />
                </div>
              ))}    
            </div>
            )}
      </div>
    </>
  );
}




