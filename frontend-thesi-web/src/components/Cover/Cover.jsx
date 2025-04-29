import React from 'react'
import styles from './Cover.module.css'

const Cover = ({ image }) => {
  return (
    <div className={styles.cover}>
        <img src={image} className={styles.image} ></img>
    </div>
  )
}

export default Cover