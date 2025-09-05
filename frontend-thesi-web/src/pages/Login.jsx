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
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const navigate = useNavigate();

  const handleEmailChange = (event) => setEmail(event.target.value);
  
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setLoading(true);
  
    try {
      const response = await axios.post(`${apiUrl}/api/login`, { email, password });
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
        setErrorMessage('E-mail ou senha inválidos. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={styles.container} > 

      <div className={styles.contentContainer}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.titleContainer} >
              <div className={'title'}>Entrar</div>
              <p> Que bom ver você de novo! Vamos fazer login. </p>
             </div>
            <InputText
              label={'Email'}
              type="email"
              name="email"
              value={email}
              placeholder="Digite seu endereço de e-mail"
              onChange={handleEmailChange}
              required
            />
            <InputText
              variant={errorMessage ? 'errorInput' : 'input'}
              label={'Senha'}
              type="password"
              name="password"
              value={password}
              placeholder="Digite sua senha"
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
              <div> Lembrar-me </div>
              <Link to="/forgot/password" >Esqueceu sua senha?</Link>
            </div>

            <Button
              variant={'secondary'}
              type="submit"
              disabled={loading}
              loading={loading}
            >
              {loading ? "" : "Login"}
            </Button>
          
            <div className={styles.textContainer} >
              <div>Não tem uma conta?</div>
              <Link to="/create/account">Cadastre-se aqui</Link>
            </div>             
          </form>
        </div>
        <img/>
      </div>
    </div>  
  );
}

export default Login;
