import React from 'react';
import styles from './NavBar.module.css';
import Button from '../Button/Button'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
      <nav className={styles.navContainer} >
        <div className={styles.optionsContainer} >
          <Button variant={'outline'}>
            Heuristic
          </Button>
          <Button variant={'outline'}>
            Semiotic
          </Button>
          <Button variant={'outline'}>
            Laws of UX
          </Button>         
          <Button variant={'outline'}>
            User Persona
          </Button>
          <Button variant={'outline'}>
            Diagrams
          </Button>    
        </div>
        <div className={styles.buttonsContainer} >
            <Link to="/login" >
              <Button variant={'transparent'}>
                Sign in 
              </Button>
            </Link>
            <Link to={"/create/account"}>
              <Button variant={'primary'} >
               Sign up 
              </Button>
            </Link>
        </div>
      </nav>
  );
};

export default NavBar;
