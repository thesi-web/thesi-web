import React from 'react'
import styles from './Warning.module.css'

const Warning = ( { icon, title, message, variant = 'warningContainer'} ) => {

  const variants = {
      warningContainer: styles.warningContainer,
      disabled: styles.disabled
    }

  return (
    <div className={`${variants[variant]}`}>
        <div className={styles.icon}>
            {icon}
        </div>
        <div className={styles.title}>
            {title}
        </div>
        <div className={styles.message}>
            {message}
        </div>
    </div>
  )
}

export default Warning