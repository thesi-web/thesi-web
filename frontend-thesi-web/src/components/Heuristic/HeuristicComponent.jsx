import React from 'react'
import styles from './HeuristicComponent.module.css'

const HeuristicComponent = ({ number }) => {
  
  const heuristics = {
    0: {
      icon: <i className="bi bi-transparency"></i>,
      title: 'Match between system and the real world',
      explanation: 'Leverage users’ understanding of the real world.'
    },
    1: {
      icon: <i className="bi bi-patch-exclamation"></i>,
      title: 'Visibility of system status',
      explanation: 'Keep users informed about what is going on.'
    },
    2: {
      icon: <i className="bi bi-arrow-counterclockwise"></i>,
      title: 'User control and freedom',
      explanation: 'Allow users to easily undo actions.'
    },
    3: {
      icon: <i className="bi bi-palette2"></i>,
      title: 'Consistency and standards',
      explanation: 'Use familiar patterns to avoid confusing users.'
    },
    4: {
      icon: <i className="bi bi-bug"></i>,
      title: 'Error prevention',
      explanation: 'Prevent errors before they occur.'
    },
    5: {
      icon: <i className="bi bi-hand-index-thumb"></i>,
      title: 'Recognition rather than recall',
      explanation: 'Show options instead of expecting users to remember.'
    },
    6: {
      icon: <i className="bi bi-code-slash"></i>,
      title: 'Flexibility and efficiency of use',
      explanation: 'Provide shortcuts for experienced users.'
    },
    7: {
      icon: <i className="bi bi-grid-1x2"></i>,
      title: 'Aesthetic and minimalist design',
      explanation: 'Display only the essential to keep the interface clean.'
    },
    8: {
      icon: <i className="bi bi-arrow-counterclockwise"></i>,
      title: 'Help users recognize, diagnose, and recover from errors',
      explanation: 'Explain errors clearly and guide users to fix them.'
    },
    9: {
      icon: <i className="bi bi-patch-question"></i>,
      title: 'Help and documentation',
      explanation: 'Provide helpful and easy-to-find assistance.'
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
   


