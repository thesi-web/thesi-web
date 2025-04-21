import React from 'react'
import styles from './Footer.module.css'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import InputText from '../InputText/InputText'

const Footer = () => {
  return (
    <footer className={styles.footer} >

        <div className={styles.contentContainer} >
          <div>
            <div className={'h3'}>About Thesi</div>
              <Link><p>How does thesis work?</p></Link>
              <Link><p>Help and documentation</p></Link>
              <Link><p>Privacy policy</p></Link>
            </div>
            <div>
          <div className={'h3'}>Quick Links</div>
            <Link><p>About us</p></Link>
            <Link><p>Blog</p></Link>
            <Link><p>Why Thesi</p></Link>
          </div>
          <div>
            <div className={'h3 '}>Contact Us</div>
              <Link><p>suporte.thesi@gmail.com</p></Link>
              <Link><p>Faculdade de Tecnologia do Ipiranga, São Paulo</p></Link>
              <Link><p>11 95061-5462</p></Link>
          </div>
        </div>
          
          <div className={styles.titleContainer}>
            <div className={'title'}>Stay Updated!</div>
            <p>Subscribe to our newsletter and get the latest updates, and exclusive content straight to your inbox. No spam, just good stuff. ✨</p>
          </div>

          <div className={styles.inputContent} >
            <div className={styles.inputContainer} >
              <input type='text' className={styles.input} placeholder='enter your best email here'  />
              <Button variant={'secondary'} >Subscribe</Button>
            </div>
          </div>

          <div className={styles.titleContainer}><p>©Thesi 2025. All rights reserved.</p></div>
      
    </footer>
  )
}

export default Footer
