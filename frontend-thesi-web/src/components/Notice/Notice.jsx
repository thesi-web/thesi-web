import React from 'react'
import styles from './Notice.module.css'

const Notice = ( {day, month, title, text} ) => {
  return (
    <div className={styles.noticeContainer} >

        <div className={styles.dateContainer} >
            <div className={'title'}>{day}</div>
            <div className={styles.month}>{month}</div>
        </div>

        <div className={styles.contentContainer}>
            <div className='h3'>{title}</div>
            <div className={styles.text}><p>{text}</p></div>
        </div>

    </div>
  )
}

export default Notice