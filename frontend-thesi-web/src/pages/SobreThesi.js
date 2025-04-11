import React from 'react'
import '../styles/SobreThesi.css';
import { Link } from 'react-router-dom';
import Rodape from '../components/Rodape';


const SobreThesi = () => {
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

      <div className='a-secao'> SOBRE A THESI </div>

      <div className='a-container'>
        <div className='a-titulo' >
          O que THESI significa?
        </div>
        <div className='thesi-texto' >
          THESI é um acrônimo em inglês para “Tool of Heuristic Evaluation and Semiotic Inspection”.
        </div>
      </div>

      <div className='a-container'>
        <div className='a-titulo' >
          Qual o campo de atuação da THESI?
        </div>
        <div className='thesi-texto' >
          A THESI aborda conceitos relacionados a área de Interação Humano-Computador, uma ciência que estuda conceitos de qualidade da usabilidade e meios para tornar uma interface agradável
        e eficiente, seguindo as técnicas de avaliação heurística e a inspeção semiótica. 
        </div>
      </div>

      <div className='a-container'>
        <div className='a-titulo' >
          Por que a THESI é útil?
        </div>
        <div className='thesi-texto' >
          Tendo em vista a diversidade de usuários que interagem com diferentes interfaces, torna-se uma necessidade que desenvolvedores e designers façam uso de ferramentas que os auxiliem durante o desenvolvimento de seus projetos para garantir que seu software esteja dentro das qualidades e requisitos propostos pelo estudo da Experiência do Usuário.  
        </div>
      </div>

      <div className='a-container'>
        <div className='a-titulo' >
          Como a THESI surgiu?
        </div>
        <div className='thesi-texto' >
          A THESI teve sua primeira versão desenvolvida em 2015 por Gabriel Gonçalves, e agora, em 2024, recebe sua versão web, desenvolvida por Gabriel Araujo, João Vitor Serra e Joicy Nunes. 
          Ela surgiu a partir da necessidade de uma ferramenta didática para as atividades práticas na disciplina de Interação Humano Computador, que é ministrada pela professora Dra. Ana Tiessi, na Fatec Ipiranga.
          A ideia inicial era desenvolver uma ferramenta para apoiar os processos de avaliação heurísticas e inspeção semiótica dos Protótipos desenvolvidos para os Trabalhos de Graduação.
        </div>
      </div>

      <div className='a-container'>
        <div className='a-titulo' >
          Qual o objetivo da THESI?
        </div>
        <div className='thesi-texto' >
          Nosso maior objetivo é auxiliar professores da matéria “Interação Humano-Computador” no ensino das técnicas de Avaliação Heurística e Inspeção Semiótica, com projetos colaborativos. 
          Durante o processo de criação deste projeto, utilizamos de pesquisas bibliográficas e uma entrevista semiestruturada para elucidar as necessidades dos usuários durante e a extração de requisitos.
        </div>
      </div>

      <Rodape />

  </div>
  )
}

export default SobreThesi;