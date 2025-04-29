import React from 'react'
import styles from './Pillars.module.css'
import Card from '../Card/Card'

const Pillars = () => {
  return (
    <div className={styles.sectionContainer}>
      <div className={styles.contentContainer} >
        <div className='title'>Our pillars</div>
        <p className='subtext' >
            At Thesi, our three essential pillars are the foundation of everything we do.
            They guide, support, and reflect every decision we make — from research to the final pixels.
            Our pillars keep us aligned with the user experience, ensuring that our designs are inclusive, practical, and truly useful.
        </p>
        <div className={styles.cardContainer}> 
            <Card title={'Usable'} text={`We design interfaces that are easy to navigate, putting the user's experience first — always.`} />
            <Card title={'Practical'} text={'Every feature serves a purpose. We simplify complexity and deliver solutions that solve real user needs.'} />
            <Card title={'Accessible'} text={'Great design is for everyone. Our products are built to be inclusive, following accessibility best practices from the start.'} />
        </div>
      </div>
    </div>
  )
}

export default Pillars