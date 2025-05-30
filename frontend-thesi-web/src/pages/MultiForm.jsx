import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import StepOneForm from '../components/Form/StepOneForm';
import StepTwoForm from '../components/Form/StepTwoForm';
import styles from './CreateProject.module.css';
import Button from '../components/Button/Button';
import Stepper from '../components/Stepper/Stepper';


export default function MultiStepForm() {

  const { fetchProjects } = useProjects();

  const apiUrl = import.meta.env.VITE_API_URL;
  
  const navigate = useNavigate();
  
  const [isStepOneValid, setIsStepOneValid] = useState(false);

  const [step, setStep] = useState(1);

  const [projectData, setProjectData] = useState({
    name: '',
    participants: '',
    objective: '',
    platform: '',
    user: 'fixed',
    templateFile: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
  const isValid = 
    projectData.name.trim() !== '' &&
    projectData.objective.trim() !== '' &&
    projectData.platform.trim() !== '';
    setIsStepOneValid(isValid);
    }, [projectData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const projectForm = new FormData();
    projectForm.append("name", projectData.name);
    projectForm.append("authors", projectData.participants);
    projectForm.append("objective", projectData.objective);
    projectForm.append("user", projectData.user);
    projectForm.append("platform", projectData.platform);

    projectData.templateFile.forEach((file) => {
      projectForm.append("template", file);
    });

    const token = localStorage.getItem("token");

    if (
      projectData.name.trim() === '' ||
      projectData.objective.trim() === '' ||
      projectData.platform.trim() === ''
      ) {
      setErrorMessage("Preencha todos os dados obrigatórios.");
      setIsLoading(false);
      return;
      }


    try {
      const res = await fetch(`${apiUrl}/api/project`, {
        method: "POST",
        body: projectForm,
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });

      if (res.ok) {
        const jsonResponse = await res.json();
        navigate(`/project/${jsonResponse.id}`);
         fetchProjects();
      } else {
        const errorResponse = await res.text();
        setErrorMessage(errorResponse);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }

    } catch (error) {
      console.error("Erro ao enviar:", error);
      setErrorMessage("Erro de rede ou inesperado.");
    } finally {
      setIsLoading(false);
    }
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
          <Button 
            variant='transparent'
            onClick={() => setStep(step - 1)}
            id='form_btn'
            disabled={isLoading}
          >
            Anterior
          </Button>
        )}

        {step < 2 && (
          <Button
            variant='secondary'
            onClick={() => setStep(step + 1)}
            id='form_btn'
            disabled={!isStepOneValid}
          >
            Next
          </Button>
        )}

        {step === 2 && (
          <Button
            type='submit'
            variant='secondary'
            id='form_btn'
            disabled={isLoading} // Aqui é onde a mágica acontece
          >
            {isLoading ? "Creating..." : "Create Project"}
          </Button>
        )}
      </div>
    </form>
  );
}
