import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import InputText from '../components/InputText/InputText';


function CreateProject() {

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

  
return (
  <div className='cp-container'>
     
    <div className={'fo-formulario'}>
        <div className='thesi-titulo-lilas-secao'>CRIAR PROJETO</div>
      
      <form method='POST' onSubmit={handleSubmit} encType='multipart/form-data'>
      
      <InputText 
        label={"Nome de Projeto"}
        type={'text'} 
        placeholder={'Digite o nome do projeto'} 
        onChange={handleNameProject} 
        required />
        
        
  
        
        <label className='thesi-label'>NOME DOS PARTICIPANTES:</label>
        <input className='cp-input' type='text' placeholder='Digite o nomes dos integrantes do projeto' onChange={handleStudentNames} required ></input>
        <div className='cp-flex-box'>
          <i className="bi bi-person-fill-add cp-icon"></i>
        </div>
        <label className='thesi-label'>OBJETIVO DO PROJETO:</label>
        <textarea className='cp-input-textarea' placeholder='Descreva sucintamente a finalidade do projeto' onChange={handleProductObjetive} maxLength={200} required></textarea>
        
        <label className='thesi-label'>TIPO DE USUÁRIO</label>
        <textarea className='cp-input-textarea' placeholder='Descreva os tipos de usuário' onChange={handleUserType} maxLength={200} required></textarea>
        
        <label className='thesi-label'>PLATAFORMA DO PROJETO</label>
        <select className='cp-input' onChange={handleProjectPlatform} value={projectPlatform} required>
          <option value="">Selecione uma plataforma</option>
          <option value="Web">Web</option>
          <option value="Mobile">Mobile</option>
          <option value="Desktop">Desktop</option>
          <option value="Multiplataforma">Multiplataforma</option>
        </select>

          <div className='thesi-titulo-lilas-secao'>
            EXPORTAR ARQUIVOS
          </div>
          <div className='thesi-label'>
            PROTÓTIPOS
          </div>
            <div className='thesi-texto'>
              Lembre-se, os protótipos são as <div className='thesi-negrito'>telas</div> que serão avaliadas! 
            </div>
            {errorMessage && (
              <div className="thesi-mensagem-de-erro ">{errorMessage}</div>
            )}
              <input className='cp-escolher-arquivo' id='prototipo' type='file' name='template' accept='image/*' onChange={handleTemplateFile} multiple></input>
              <label htmlFor='prototipo' className='thesi-botao-azul'>PROCURAR ARQUIVOS</label>
              {templateFile.length > 0 && (
                <div>
                    {templateFile.map((file, index) => (
                      <div className='cp-arqivos-carregados' key={index}>{file.name} <i class="bi bi-x-lg" style={{ marginLeft: '10px' }} onClick={() => removeFile(file.name, 'template')}
                      ></i> </div>
                    ))}
                </div>
              )}
          <div className='thesi-label'>
            ARQUIVOS DE MODELAGEM FUNCIONAL
          </div>
            <div className='thesi-texto'>Os arquivos de modelagem funcional podem ser: <div className='thesi-negrito'>Diagrama de Caso de Uso</div>, <div className='thesi-negrito'>Persona</div>, <div className='thesi-negrito'>UX Canvas</div>... Eles são essenciais para descrever e planejar o comportamento de um sistema do ponto de vista do <div className='thesi-negrito'>usuário</div>.
          </div>
            <input className='cp-escolher-arquivo' id='arquivos' type='file' name='modeling' accept='.docx,.doc,.pdf,.png,.jpeg' onChange={handleModelingFile} multiple></input>
            <label htmlFor='arquivos' className='thesi-botao-azul' >PROCURAR ARQUIVOS</label>
            {modelingFile.length > 0 && (
              <div> 
                  {modelingFile.map((file, index) => (
                    <div className='cp-arqivos-carregados' key={index}>
                      {file.name} <i class="bi bi-x" style={{ marginLeft: '10px' }} onClick={() => removeFile(file.name, 'modeling')} ></i>
                    </div> 
                  ))}
              </div>
            )}
           
          
          <button className='thesi-botao-verde'type='submit' disabled={isLoading}
          >
            {isLoading ? 'CRIANDO PROJETO...' : 'CRIAR PROJETO'}
          </button>
      </form>
    </div>
  </div>
  )
}

export default CreateProject;