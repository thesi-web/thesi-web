import InputText from '../InputText/InputText';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import styles from './StepOneForm.module.css'

export default function StepOneForm({ projectData, setProjectData }) {

  const platforms = ['Web', 'Mobile', 'Desktop'];

  const handleChange = (key) => (e) => {
    setProjectData({ ...projectData, [key]: e.target.value });
  };


  return (
    <>
      <InputText label="Nome do Projeto" type="text" placeholder="digite o nome" onChange={handleChange('name')} value={projectData.name} required />
      <InputText label="Participantes" type="text" placeholder="nomes dos participantes" onChange={handleChange('participants')} value={projectData.participants} required />
      <div className='label'>Objetivo</div>
      <TextArea placeholder="descreva a finalidade" onChange={handleChange('objective')} value={projectData.objective} maxLength={200} required />
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
