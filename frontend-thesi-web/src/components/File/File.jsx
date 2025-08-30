import React from 'react'
import styles from './File.module.css'
import Button from '../Button/Button'

const File = ( { title, onClick, size }) => {
  return (
    <div className={styles.file}>
        <div className={styles.nameContainer} >
          <div className={styles.icon}>
              <i className="bi bi-image"></i>
          </div>
          <div>
            <div className={styles.title}>
                {title} 
            </div>
            <p>
              {size}
            </p>
          </div>
        </div>
        
        <div>
          <Button icon={<i class="bi bi-x-lg"></i>} variant={'icon'} onClick={onClick} />
        </div>
    </div>
  )
}

export default File