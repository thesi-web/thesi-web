import React from 'react'
import styles from './CanvaSection.module.css'
import Button from '../Button/Button'
import { Link } from 'react-router-dom';

const CanvaSection = () => {
  return (
    <div className={styles.sectionContainer}>
        <img src={'/images/canva.png'} />
      <div className={styles.contentContainer} >
        <div>
          <div className='title'>
            Start evaluating interfaces in a simple and practical way!
          </div>
          <p className='subtext' >
            Join the world's first heuristic evaluation and semiotic inspection platform!
          </p>
        </div>
        <div>
          <Link to={"/create/account"}>
            <Button variant={'secondary'}>Sign up for Thesi</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CanvaSection