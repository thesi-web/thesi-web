import React from 'react'
import styles from './Card.module.css'

const Card = ( {icon, title, text} ) => {
  return (
    <div className={styles.cardContainer}>
        <div className={styles.iconContainer}>{icon}</div>
        <div className='h3'>{title}</div>
        <p className='subtext' >{text}</p>
    </div>
  )
}

export default Card