import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './CreateProject.module.css'
import InputText from '../components/InputText/InputText';
import Button from '../components/Button/Button';
import TextArea from '../components/TextArea/TextArea';
import SideBar from '../components/Sidebar/Sidebar'
import MultiStepForm from './MultiForm';


function CreateProject() {

  const [step, setStep] = useState(1);

  const [nameProject, setNameProject] = useState("");
  const [studentNames, setStudentNames] = useState("");
  const [projectObjective, setProjectObjective] = useState("");
  const [userType, setUserType] = useState("");
  const [projectPlatform, setProjectPlatform] = useState("");
  const [templateFile, setTemplateFile] = useState([]);
  const [modelingFile, setModelingFile] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);  // Novo estado para controlar o carregamento
  const navigate = useNavigate();
  
  const handleNameProject = (event) => {
    setNameProject(event.target.value);
  };

  const handleStudentNames = (event) => {
    setStudentNames(event.target.value);
  };

  const handleProductObjetive = (event) => {
    setProjectObjective(event.target.value);
  };

  const handleUserType = (event) => {
    setUserType(event.target.value);
  };

  const handleProjectPlatform = (event) => {
    setProjectPlatform(event.target.value);
  };

  const handleTemplateFile = (event) => {
    const files = Array.from(event.target.files); 
    setTemplateFile(prevFiles => [...prevFiles, ...files]);
  };

  const handleModelingFile = (event) => {
    const files = Array.from(event.target.files);
    setModelingFile(prevFiles => [...prevFiles, ...files]); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    const projectForm = new FormData();
    projectForm.append("name", nameProject);
    projectForm.append("authors", studentNames);
    projectForm.append("objective", projectObjective);
    projectForm.append("user", userType);
    projectForm.append("platform", projectPlatform);

  templateFile.forEach((file) => {
    projectForm.append("template", file);
  });

  modelingFile.forEach((file) => {
    projectForm.append("modeling", file);
  });

   
    const token = localStorage.getItem("token");
    
    const res = await fetch( "http://localhost:3001/enviar-projeto", {
      method: "POST",
      body: projectForm,
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
   
    if (res.ok) { 
      const jsonResponse = await res.text();
      navigate('/aluno/meus-projetos');
    } else {
      const errorResponse = await res.text(); 
      setErrorMessage(errorResponse)
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      setIsLoading(false); 
    }

    
    setIsLoading(false);  // Reabilita o botão após o envio

  };

  const removeFile = (fileName, type) => {
    if (type === 'template') {
      setTemplateFile(prevFiles => prevFiles.filter(file => file.name !== fileName));
    } else if (type === 'modeling') {
      setModelingFile(prevFiles => prevFiles.filter(file => file.name !== fileName));
    }
  };

  const platforms = [
    { label: "Web"},
    { label: "Mobile"},
    { label: "Desktop"},
    { label: "Multiplataforma"},
  ];
  
  
return (
  <>
  <div className={styles.ProjectContainer}>
    <div className='h1'>✨Criar Projeto</div>
      <p> Crie seu projeto em poucos cliques e envie os arquivos necessários. </p>
        < MultiStepForm />
      </div>
    </>
  )
}

export default CreateProject;