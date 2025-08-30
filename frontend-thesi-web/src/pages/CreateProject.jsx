import styles from './CreateProject.module.css'
import MultiStepForm from './MultiForm';

function CreateProject() {


return (
  <>
    <div className={styles.ProjectContainer}>
      < MultiStepForm />
    </div>
  </>
  )
}

export default CreateProject;