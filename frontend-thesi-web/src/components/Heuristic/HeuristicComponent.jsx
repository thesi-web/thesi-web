import React from 'react'
import styles from './HeuristicComponent.module.css'

const HeuristicComponent = ({ number }) => {
  
  const heuristics = {
    0: {
    icon: <i className="bi bi-transparency"></i>,
    title: 'Correspondência entre o sistema e o mundo real',
    explanation: 'Aproveite o entendimento que os usuários têm do mundo real.'
  },
  1: {
    icon: <i className="bi bi-patch-exclamation"></i>,
    title: 'Visibilidade do status do sistema',
    explanation: 'Mantenha os usuários informados sobre o que está acontecendo.'
  },
  2: {
    icon: <i className="bi bi-arrow-counterclockwise"></i>,
    title: 'Controle e liberdade do usuário',
    explanation: 'Permita que os usuários desfazem ações facilmente.'
  },
  3: {
    icon: <i className="bi bi-palette2"></i>,
    title: 'Consistência e padrões',
    explanation: 'Use padrões familiares para evitar confundir os usuários.'
  },
  4: {
    icon: <i className="bi bi-bug"></i>,
    title: 'Prevenção de erros',
    explanation: 'Evite que erros ocorram antes que aconteçam.'
  },
  5: {
    icon: <i className="bi bi-hand-index-thumb"></i>,
    title: 'Reconhecimento em vez de memorização',
    explanation: 'Mostre opções em vez de esperar que os usuários se lembrem.'
  },
  6: {
    icon: <i className="bi bi-code-slash"></i>,
    title: 'Flexibilidade e eficiência de uso',
    explanation: 'Ofereça atalhos para usuários experientes.'
  },
  7: {
    icon: <i className="bi bi-grid-1x2"></i>,
    title: 'Design estético e minimalista',
    explanation: 'Exiba apenas o essencial para uma interface limpa.'
  },
  8: {
    icon: <i className="bi bi-arrow-counterclockwise"></i>,
    title: 'Ajudar usuários a reconhecer, diagnosticar e corrigir erros',
    explanation: 'Explique os erros de forma clara e guie os usuários para corrigi-los.'
  },
  9: {
    icon: <i className="bi bi-patch-question"></i>,
    title: 'Ajuda e documentação',
    explanation: 'Forneça ajuda útil e de fácil acesso.'
  },
  }
  
  
    const { icon, title, explanation } = heuristics[number]
  
    return (
      <div>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.explanation}>{explanation}</div>
      </div>
    )
  }
  
export default HeuristicComponent
   


