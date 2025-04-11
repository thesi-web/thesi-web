import React from 'react';
import styles from './NavBar.module.css';
import Button from '../Button/Button'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <nav>
        <div className={styles.navContainer}>
          
          <div className={styles.navOptions} >

            <ul>
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
            </ul>

          </div>

          <div>
             <Button>
                <Link to="/login" > Login </Link>
              </Button>
              <Button>
                Sing Up
              </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
