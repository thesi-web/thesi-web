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

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.length >= 2) {
        const token = localStorage.getItem("token"); // ou onde você armazenou
          fetch(`http://localhost:3000/api/search/user?search=${encodeURIComponent(searchTerm)}`, {
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
      <InputText label="Nome do Projeto" type="text" placeholder="digite o nome" onChange={handleChange('name')} value={projectData.name} required />
        <label className='label'>Participantes</label>
      <div className={styles.namesContainer}>
        <InputText type="text" placeholder="adicione mais participantes ao projeto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchResults.length > 0 && (
            <div className={styles.searchResults}>
              {searchResults.map((user) => (
                <div className={styles.name} key={user.id} onClick={() => handleSelectUser(user)}>
                  {user.name}
                </div>
              ))}
            </div>
          )}
        {selectedParticipants.length > 0 && (
          <div className={styles.selectedList}>
            {selectedParticipants.map((user) => (
              <div key={user.id} className={styles.selectedParticipant}>
                <div>{user.name}</div>
                <div className={styles.icon} onClick={() => handleRemoveUser(user.id)}><i className="bi bi-x-lg"></i></div>
              </div>
            ))}
          </div>
        )}
</div>
      <div className='label'>Objetivo</div>
      <TextArea placeholder="descreva a finalidade do projeto" onChange={handleChange('objective')} value={projectData.objective} maxLength={200} required />
      <div className='label'>Plataforma</div>
      <div className={styles.buttonContainer}>
        {platforms.map((label) => (
          <Button
            key={label}
            variant={projectData.platform === label ? "enabled" : "disabled"}
            onClick={() => setProjectData({ ...projectData, platform: label })}
          >
            {label}
          </Button>
        ))}
      </div>
    </>
  );
}
