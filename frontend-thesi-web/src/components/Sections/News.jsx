import React from 'react'
import styles from './News.module.css'
import Notice from '../Notice/Notice'
import Button from '../Button/Button' 

const News = () => {
  return (
    <div className={styles.sectionContainer} >
        <div className={styles.contentContainer}>
          <div className={styles.messageContainer} >
            <div className='title'>What's news?</div>
            <p>We're constantly evolving! Stay up to date with our latest news and never miss a thing.</p>
            <div className={styles.buttonContainer} ><Button variant={'primary'} >View all</Button></div>
          </div>
          <div className={styles.noticesContainer} >
              <Notice day={'23'} month={'December'} title={'werwerwerw'} text={'vdfghtosdjfsoidfoisdjfoisjdfiosqlwdpsdkvp'} />
              <Notice day={'23'} month={'November'} title={'werwerwerw'} text={'vdfghtdhokoplclsdldsdqijwokpdpqlwdpsdkvp'} />
              <Notice day={'23'} month={'April'} title={'werwerwerw'} text={'vdfghtdhokoplclsdldsdqijwokpdpqlwdpsdkvp'} />
          </div>
        </div>
    </div>
  )
}

export default News