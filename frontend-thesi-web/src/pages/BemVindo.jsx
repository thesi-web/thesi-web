import React, { useEffect, useState } from 'react';
//import Navbar from '../components/layout/Navbar'
//import DESIGNER from '../assets/img/BemVindo.png';

const BemVindo = () => {
  const [role, setRole] = useState('');

  // Recupera o papel do usuário do localStorage
  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);
  }, []);

  return (
    <div>
        <Navbar/>
        <div className='i-container'>
          <div className='i-titulo-container'>
            <div className='i-titulo'>
              Bem-vindo a THESI!
            </div>
            {role === 'aluno' && (
              <div className='i-texto'>
                Para começar, você pode criar um novo projeto clicando em{' '}
                <div className='i-negrito'>NOVO PROJETO</div>.
              </div>
            )}
            {role === 'professor' && (
              <div className='i-texto'>
                Você pode visualizar as <div className='i-negrito'>NOTIFICAÇÕES</div> dos projetos
                enviados para avaliação.
              </div>
            )}
          </div>
          {/*<img className='i-imagem' src={DESIGNER} alt="imagem de boas vindas"/>*/}
        </div>
    </div>
  )
}

export default BemVindo