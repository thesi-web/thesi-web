import styles from './CreateProject.module.css'
import MultiStepForm from './MultiForm';

function CreateProject() {


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