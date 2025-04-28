import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NavigationBar.module.css'
import Button from '../Button/Button'
import { Link } from 'react-router-dom';

const NavigationBar = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/logout", { method: "POST" });
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className={styles.navContainer} >
        <div className={styles.optionsContainer} >
            
            <Link to="/professor/home" >
              <Button variant={'outline'}>
                Home 
              </Button>
            </Link>

            <Link to="/professor/projects" >
              <Button variant={'outline'}>
                Projects 
              </Button>
            </Link>
   
            <Button variant={'outline'} onClick={handleLogout}>
              Logout
            </Button>   
        </div>
      </nav>
  )
}

export default NavigationBar