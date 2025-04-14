import React from 'react'
import styles from './Icon.module.css'

const Icon = ( { icon } ) => {
  return (
    <div className={styles.iconContainer} >
        {icon}
    </div>
  )
}

export default Icon