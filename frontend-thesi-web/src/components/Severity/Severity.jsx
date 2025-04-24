import classNames from 'classnames'
import styles from './Severity.module.css' 

const Severity = ({ severity }) => {
  const variantMap = {
    1: styles.severidade1,
    2: styles.severidade2,
    3: styles.severidade3,
    4: styles.severidade4,
    5: styles.severidade5
  };

  const severityClass = classNames(
    styles.severidade,
    variantMap[severity] 
  );

  return (
    <div className={severityClass}>
      {severity}
    </div>
  );
};

export default Severity;
