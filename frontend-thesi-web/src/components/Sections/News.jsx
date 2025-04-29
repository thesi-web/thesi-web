import React from 'react'
import styles from './News.module.css'
import Notice from '../Notice/Notice'
import Button from '../Button/Button' 

const News = () => {
  return (
    <div className={styles.sectionContainer} >
        <div className={styles.contentContainer}>
          <div className={styles.messageContainer} >
            <div className='title'>What's new?</div>
            <p className='subtext' >We're constantly evolving! Stay up to date with our latest news and never miss a thing.</p>
            <div className={styles.buttonContainer} ><Button variant={'primary'} >View all</Button></div>
          </div>
          <div className={styles.noticesContainer} >
              <Notice 
                day={'30'} 
                month={'April'} 
                title={'First THESI lab test'} 
                text={`We're running the first THESI lab test today — a key step in validating its real-world performance.`} />
          </div>
        </div>
    </div>
  )
}

export default News