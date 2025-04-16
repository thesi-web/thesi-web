import React from 'react'
import styles from './Severity.module.css' 

const Severity = ({ severity }) => {
  const variants = {
    1: styles.severidade1,
    2: styles.severidade2,
    3: styles.severidade3,
    4: styles.severidade4,
    5: styles.severidade5
  }

  return (
    <div className={`${variants[severity] || ''}`}>
      {severity}
    </div>
  )
}

export default Severity
