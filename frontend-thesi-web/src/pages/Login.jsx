import axios from 'axios';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import InputText from '../components/InputText/InputText';
import Button from '../components/Button/Button';
import styles from './Login.module.css'
import { jwtDecode } from "jwt-decode";

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleEmailChange = (event) => setEmail(event.target.value);
  
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setLoading(true);
  
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      const { token } = response.data;
  
      localStorage.setItem("token", token);
  
      const decoded = jwtDecode(token); // Decodifica o token JWT
      const userRole = decoded.role;    // Pega o papel do usuário
  
      if (userRole === 'aluno') {
        navigate('/home');
      } else {
        navigate('/professor/home');
      }
  
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorMessage('Credenciais inválidas. Tente novamente.');
      } else {
        setErrorMessage('Invalid email or password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={styles.container} > 

      <div className={styles.contentContainer}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.titleContainer} >
              <div className={'title'} >Sign in</div>
              <p> Hey! Good to see you again! Let's get you signed in 🐣</p>
             </div>
            <InputText
              label={'E-mail'}
              type="email"
              name="email"
              value={email}
              placeholder="enter your e-mail addres"
              onChange={handleEmailChange}
              required
            />
            <InputText
              variant={errorMessage ? 'errorInput' : 'input'}
              label={'Password'}
              type="password"
              name="password"
              value={password}
              placeholder="enter your password"
              onChange={handlePasswordChange}
              required
            />
            {errorMessage && <div className={'errorMessage'} >{errorMessage} <i className="bi bi-exclamation-circle-fill"></i> </div>}

            <div className={styles.rememberContainer} >
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <div> Remember me </div>
              <a href={'/forgot/password'} >Forgot your password?</a>
            </div>

        
              <Button
                variant={'secondary'}
                type="submit"
                disabled={loading}
                id={'form_btn'}
              >
                {loading ? "Loading..." : "Log in"}
              </Button>

            <div className={styles.textContainer} >
              <div>Don't have an account?</div>
              <a href={'/create/account'}>Register here </a>
            </div>             
          </form>
        </div>
        <img/>
      </div>
    </div>  
  );
}

export default Login;
