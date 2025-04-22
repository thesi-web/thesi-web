import styles from './CreateProject.module.css'
import MultiStepForm from './MultiForm';

function CreateProject() {


return (
  <>
  <div className={styles.ProjectContainer}>
    <div className='h1'>Create Project</div>
      <p> Create your project in just a few clicks and upload the necessary files. </p>
        < MultiStepForm />
      </div>
    </>
  )
}

export default CreateProject;