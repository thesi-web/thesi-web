import React from 'react'
import styles from './File.module.css'
import Button from '../Button/Button'

const File = ( { title, onClick }) => {
  return (
    <div className={styles.file}>
        <div className={styles.nameContainer} >
        <div className={styles.icon}>
            <i class="bi bi-image"></i>
        </div>
        <div className={styles.title}>
            {title} 
        </div>
        </div>
        <Button variant={'transparent'} onClick={onClick}>Remover</Button>
    </div>
  )
}

export default File