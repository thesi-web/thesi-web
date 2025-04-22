import React from 'react';

const Homescreen = ( {role} ) => {
  
  return (
    <div className='view' >
      <div >
        Bem-vindo a THESI!
      </div>

      {role === 'aluno' && (
        <p> Aluno </p>
      )}
      {role === 'professor' && (
          <p> Professor </p>
      )}
    </div>   
  )
}

export default Homescreen;