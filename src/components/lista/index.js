import React from 'react';

function Lista({ funcao, dados, className = '' }) {
  return (
    <div className={`${className}`}>
  		{dados.map(funcao)}
  	</div>
  )
}

export default Lista

