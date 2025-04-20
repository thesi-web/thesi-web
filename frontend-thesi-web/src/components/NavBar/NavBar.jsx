import React from 'react';
import styles from './NavBar.module.css';
import Button from '../Button/Button'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
      <nav className={styles.navContainer} >
        <div className={styles.optionsContainer} >
          <Button variant={'outline'}>
            Opção 1
          </Button>
          <Button variant={'outline'}>
            Opção 1
          </Button>
          <Button variant={'outline'}>
            Opção 1
          </Button>         
          <Button variant={'outline'}>
            Opção 1
          </Button>
          <Button variant={'outline'}>
            Opção 1
          </Button>    
        </div>
        <div className={styles.buttonsContainer} >
            <Button variant={'transparent'}>
              <Link to="/login" > Sign in </Link>
            </Button>
            <Button variant={'primary'} >
              Sign Up
            </Button>
        </div>
      </nav>
  );
};

export default NavBar;
