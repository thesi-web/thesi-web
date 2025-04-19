import React from 'react';
import styles from './NavBar.module.css';
import Button from '../Button/Button'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <nav className={styles.navContainer} >

        <div className={styles.optionsContainer} >
            <Button>
              Opção 1
            </Button>
          
            <Button>
              Opção 1
            </Button>

            <Button>
              Opção 1
            </Button>

            <Button>
              Opção 1
            </Button>

            <Button>
              Opção 1
            </Button>

            <Button>
              Opção 1
            </Button>
        </div>

        <div className={styles.buttonsContainer} >
            <Button>
              <Link to="/login" > Login </Link>
            </Button>
            <Button>
              Sign Up
            </Button>
        </div>

      </nav>
    </div>
  );
};

export default NavBar;
