import styles from './Stepper.module.css';

export default function Stepper({ currentStep }) {
  const steps = ['Informações gerais', 'Upload das telas'];

  return (
    <div className={styles.stepper}>
      {steps.map((label, index) => {
        const isActive = currentStep === index + 1;
        return (
          <div key={index} className={styles.step}>
            <div className={`${styles.square} ${isActive ? styles.active : ''}`}>
              {index + 1}
            </div>
            <span className={`${styles.label} ${isActive ? styles.activeLabel : ''}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
