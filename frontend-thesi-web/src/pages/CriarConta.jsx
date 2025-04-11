import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CriarConta() {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Função para formatar o telefone automaticamente
  const handlePhoneChange = (event) => {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length > 11) input = input.slice(0, 11); // Limite para 11 dígitos (DDD + 9 dígitos)

    if (input.length > 2) {
      input = `(${input.slice(0, 2)})${input.slice(2)}`;
    }
    if (input.length > 8) {
      input = `${input.slice(0, 9)}-${input.slice(9)}`;
    }

    setPhone(input);
  };

  // Verificar se a senha atende aos requisitos
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value.slice(0, 50)); // Limitar a 50 caracteres
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmpassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificação de e-mail válida
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Por favor, insira um e-mail válido.');
      return;
    }

    // Verificação da senha
    if (!validatePassword(password)) {
      setErrorMessage('A senha deve conter letras maiúsculas, minúsculas, números e símbolos.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        name,
        phone,
        email,
        password,
        confirmpassword: confirmPassword,
      });

      if (response && response.status === 201) {
        setSuccessMessage('Usuário criado com sucesso!');
        setTimeout(() => {
          navigate('/Login');
        }, 1000); // Redirecionar após o cadastro
      } else {
        setErrorMessage('Erro inesperado ao criar usuário');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        setErrorMessage(error.response.data.msg);
      } else {
        setErrorMessage('Erro ao criar usuário');
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google'; // Redireciona para a rota de autenticação do Google no backend
  };

  return (
    
    <div className="container">

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
      
    <div className="criar-conta-container">      
    <div className="thesi-container" >
      <div className="thesi-titulo">
        Crie o seu perfil
      </div>

      <div className='thesi-formulario' >
        <form className="re-formulario" onSubmit={handleSubmit}>
          
          <input className="thesi-input"
            type="text"
            name="phone"
            value={phone}
            placeholder="Insira um número de telefone válido"
            onChange={handlePhoneChange}
            required
          />

          <div className="thesi-texto">
            Seu número de telefone é importante! Para saber mais, acesse a nossa<Link to="/LGPD" className="thesi-link au-negrito"> Política de Privacidade.</Link>
          </div>

            <input className="thesi-input"
              type="text"
              name="name"
              value={name}
              placeholder="Digite o seu nome"
              onChange={handleChange}
              required
            />

            <input className="thesi-input"
              type="email"
              name="email"
              value={email}
              placeholder="Digite o seu melhor e-mail"
              onChange={handleChange}
              required
            />
            
            <input className="thesi-input"
              type="password"
              name="password"
              value={password}
              placeholder="Digite sua senha"
              onChange={handleChange}
              required
            />

            <input className="thesi-input"
              type="password"
              name="confirmpassword"
              value={confirmPassword}
              placeholder="Confirme sua senha"
              onChange={handleChange}
              required
            />

            {errorMessage && <div className="thesi-mensagem-de-erro">{errorMessage}</div>}
            {successMessage && <div className="thesi-mensagem-de-sucesso">{successMessage}</div>}

            <div className="thesi-botao-container">
              <button className="thesi-botao-roxo" type="submit">CRIAR CONTA</button>
            </div>
          </form>
      </div>


        <div className="thesi-texto">
          Ao entrar, você concorda com os nossos<div className="thesi-link au-negrito"> Termos e Política de Privacidade.</div>
        </div>

      </div>
      </div>
    </div>
    
  )
}

export default CriarConta;
            