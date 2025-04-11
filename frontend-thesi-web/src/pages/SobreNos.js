import React from 'react'
import '../styles/SobreNos.css'
import { Link } from 'react-router-dom';
import GABRIEL from '../assets/img/Gabriel.png';
import VITOR from '../assets/img/Vitor.png';
import JOICY from '../assets/img/Joicy.png';
import Rodape from '../components/Rodape';

const SobreNos = () => {
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

    <div className='au-titulo'> QUEM NÓS SOMOS? </div>

    <div className='au-container'>
      <div className='au-texto-container'>
        Antes de qualquer coisa, sejam muito bem-vindos ao nosso site! Somos um grupo de alunos da FATEC Ipiranga do curso de Análise e Desenvolvimento de Sistemas, <strong>APAIXONADOS</strong> por Interação Humano-Computador e comprometidos em fornecer ferramentas de qualidade para auxiliar os professores desta matéria no processo de ensino.
      </div>
    </div>

    <div className='au-titulo' > CONHEÇA NOSSO TIME! </div>

    <div className='au-flex-container' > {/* FlexBox */}
      <div className='au-flex-card'>
        <img className='au-imagem-perfil' src={GABRIEL} alt="Gabriel"/>
        <p className='au-titulo'>GABRIEL CARDOSO</p>
      </div>

      <div className='au-flex-card'>
      <img className='au-imagem-perfil' src={VITOR} alt="Vitor"/>
        <p className='au-titulo' >JOÃO VITOR SERRA</p>
      </div>

      <div className='au-flex-card'>
        <img className='au-imagem-perfil' src={JOICY} alt="Joicy"/>
        <p className='au-titulo' >JOICY NUNES</p>
      </div>

    </div> {/* Fim da FlexBox */}

    <div className='au-justificativa' >
      <div className='thesi-texto'>
        Juntos, desenvolvemos esta plataforma com um propósito claro: ajudar os professores de IHC no ensino das técnicas de Avaliação Heurística e Inspeção Semiótica. 
        Nós reconhecemos a importância destes artifícios no <div className='au-negrito'>design</div> e na <div className='au-negrito'>avaliação de interfaces digitais</div>, e estamos <strong>empenhados</strong> em fornecer uma ferramenta eficaz para facilitar esse processo educacional. 
      </div>
    </div>
    
    <div className='au-titulo'> OBRIGADO POR ESCOLHER E ACREDITAR NA THESI! </div>    

    <Rodape/>

    </div>
  )
}

export default SobreNos;