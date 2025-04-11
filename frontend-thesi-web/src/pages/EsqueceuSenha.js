import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../index.css'

function EsqueceuSenha() {

const [email, setEmail] = useState ('');

  const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };

  const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
      
      console.log(email);

      if (!email) {
        console.error("Email é obrigatório");
        return;
      }
      
      const res = await fetch("http://localhost:3001/recuperar-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        console.log("E-mail enviado com sucesso");
        setTimeout(() => navigate("/Login"), 1000);
  
      } else {
        console.log("Erro na requisição:", res.statusText);
      }
    };
  

  return (
    <div> 

      <div className='au-botao-login-container'>
        <div>
          <button className='thesi-botao-branco'><Link to="/inicio" className='thesi-link'>
              RETORNAR</Link>
          </button>
        </div>
        <div>
          <button className='thesi-botao-roxo'><Link to="/login" className='thesi-link'>
              FAZER LOGIN</Link>
          </button>
        </div>
      </div>

    <div className='es-box'>
      <div className="thesi-container">
        <div className="thesi-titulo">
          Esqueci a senha
        </div>  
          <div className="thesi-texto">
            Está tudo bem, isso pode acontecer com todo mundo!<br></br>
            Enviaremos as instruções para que você possa recuperar a sua senha.
          </div>
            <div className="thesi-formulario">
              <form className="forgot-form" onSubmit={handleSubmit}>
                <input className="thesi-input" 
                  type="email"
                  name="email"
                  value={email}
                  placeholder="E-mail"
                  onChange={handleEmailChange}
                />
              <div className="thesi-botao-container"> 
                <button className="thesi-botao-roxo lo-espaco" type="submit">ENVIAR</button> 
              </div>
              </form>
            </div>
            <div className="thesi-texto">
              Não tem uma conta?<Link to="/criar-conta" className="thesi-negrito"> CRIAR NOVA CONTA</Link>
            </div>
      </div>
    </div>
  </div>
  )
}

export default EsqueceuSenha;