import React from 'react'
import styles from './HeuristicComponent.module.css'

const HeuristicComponent = ({ number }) => {
    const heuristics = {
      0: {
        icon: <i class="bi bi-transparency"></i>
        ,
        title: 'Correspondência entre o sistema e o mundo real',
        explanation: 'Aproveite as percepções dos usuários sobre o mundo'
      },
      1: {
        icon: <i class="bi bi-patch-exclamation"></i>,
        title: 'Visibilidade do status do sistema',
        explanation: 'Mantenha o usuário informado sobre o que está acontecendo.'
    },
      2: {
        icon: <i class="bi bi-arrow-counterclockwise"></i>,
        title: 'Controle e liberdade do usuário',
        explanation: 'Permita que o usuário desfaça ações facilmente.'
    },
      3: {
        icon: <i class="bi bi-palette2"></i>,
        title: 'Consistência e padrões',
        explanation: 'Use padrões familiares para não confundir o usuário.'
    },
      4: {
        icon: <i class="bi bi-bug"></i>,
        title: 'Prevenção de erros',
        explanation: 'Evite erros antes que eles aconteçam.'
    },
      5: {
        icon: <i class="bi bi-hand-index-thumb"></i>,
        title: 'Reconhecimento em vez de lembrança',
        explanation: 'Mostre opções em vez de exigir que o usuário memorize.'
    },
      6: {
        icon: <i class="bi bi-code-slash"></i>,
        title: 'Flexibilidade e eficiência de uso',
        explanation: 'Ofereça atalhos para quem já conhece o sistema.'
    },
      7: {
        icon: <i class="bi bi-grid-1x2"></i>,
        title: 'Design estético e minimalista',
        explanation: 'Mostre só o essencial, sem poluir a interface.'
    },
      8: {
        icon: <i class="bi bi-arrow-counterclockwise"></i>,
        title: 'Reconhecer, diagnosticar e se recuperar de erros',
        explanation: 'Explique erros com clareza e ajude a corrigi-los.'
    },
      9: {
        icon: <i class="bi bi-patch-question"></i>,
        title: 'Ajuda e documentação',
        explanation: 'Disponibilize ajuda útil e fácil de encontrar.'
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
   


