import axios from 'axios';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

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
      navigate('/home');
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorMessage('Credenciais inválidas. Tente novamente.');
      } else {
        setErrorMessage('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div> 
      <div className='au-botao-login-container'>
        <div>
          <button className='thesi-botao-branco'>
            <Link to="/home" className='thesi-link'>RETORNAR</Link>
          </button>
        </div>
      </div>

      <div className="lo-flexbox">
        <div className="lo-logo-container">  
          <img className="login-logo" alt="THESI" />
          <div className="lo-titulo-container">
            Avaliação simples e cooperativa. Vem ser THESI!
          </div>
        </div> 

        <div className="lo-container">
          <div className="thesi-container"> 
            <div className="thesi-titulo">Entrar</div>
            <form className="login-form" onSubmit={handleSubmit}>  
              <input
                className="thesi-input"
                type="email"
                name="email"
                value={email}
                placeholder="E-mail"
                onChange={handleEmailChange}
                required
              />
              <input
                className="thesi-input"
                type="password"
                name="password"
                value={password}
                placeholder="Senha"
                onChange={handlePasswordChange}
                required
              />
              <div className="lo-esqueceu-container">
                <Link to="/esqueci-senha" className="lo-esqueceu">ESQUECEU?</Link>
              </div>
              <div className="lo-lembrar-me-container">
                <div className="lo-lembrar-me">
                  <input
                    className="thesi-checkbox"
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <div className="lo-lembrar-me-texto">Lembrar-me</div>
                </div>
              </div>

              {errorMessage && <div className="thesi-mensagem-de-erro">{errorMessage}</div>}

              <div className="thesi-botao-container"> 
                <button
                  type="submit"
                  className="thesi-botao-roxo lo-espaco"
                  disabled={loading}
                >
                  {loading ? "Carregando..." : "ENTRAR"}
                </button>
              </div>
            </form>

            <div className="thesi-texto">
              Não tem uma conta?
              <Link to="/criar-conta" className="thesi-negrito"> CRIAR NOVA CONTA</Link>
            </div>
          </div>
        </div>
      </div>
    </div>  
  );
}

export default Login;
