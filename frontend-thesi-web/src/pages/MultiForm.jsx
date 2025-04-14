import { useState } from 'react';
import StepOneForm from '../components/Form/StepOneForm';
import StepTwoForm from '../components/Form/StepTwoForm';
import styles from './CreateProject.module.css'
import Button from '../components/Button/Button';
import Stepper from '../components/Stepper/Stepper';

export default function MultiStepForm() {

  const [step, setStep] = useState(1);

  // Todos os estados compartilhados ficam aqui
  const [projectData, setProjectData] = useState({
    name: '',
    participants: '',
    objective: '',
    platform: '',
    templateFile: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando tudo:", projectData);
    // Aqui vai o fetch ou lógica de envio pro backend
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} encType='multipart/form-data'>
       <Stepper currentStep={step} />
      {step === 1 && (
        <StepOneForm projectData={projectData} setProjectData={setProjectData} />
      )}

      {step === 2 && (
        <StepTwoForm projectData={projectData} setProjectData={setProjectData} />
      )}

      <div className={styles.buttonContainer}>
        
        {step > 1 && (
          <Button iconPosition='left' icon={<i class="bi bi-arrow-left-circle"></i>} variant='transparent' onClick={() => setStep(step - 1)}>Anterior</Button>
        )}

        {step < 2 && (
          <Button variant='none' onClick={() => setStep(step + 1)}></Button>
        )}
        {step < 2 && (
          <Button icon={<i class="bi bi-arrow-right-circle"></i>} variant='transparent' onClick={() => setStep(step + 1)}>Próximo</Button>
        )}
        {step === 2 && (
          <Button type='submit' variant='success'>Criar Projeto</Button>
        )}
      </div>
    </form>
  );
}
