import React, { useState } from 'react';
import '../../pages/login/login.css';
import { Lista } from '../../components';

export default function FormularioContato( props ) {
  
  const { setCampoUm, setCampoDois } = props;

  const linha = ( item, i ) => {
    return (
      <>
        <label>Contato {i+1}:</label>
        <input key={ i } className={ item.classe } type={ item.tipo } placeholder={ item.dica } onChange={ evt => item.metodo( evt.target.value ) } />
      </>
    )
  }

  return (
      <>
        <h2 className="titulo">Contato:</h2>
        <Lista
          className="container-inputs"
          dados={[
            { titulo: 'Tipo:', classe: 'input-padrao tag-tamanho-total', tipo:'text', dica: '', metodo: setCampoUm  },
            { titulo: 'Valor:', classe: 'input-padrao tag-tamanho-total', tipo:'text', dica: '', metodo: setCampoDois  },
          ] }
          funcao={ ( item, i ) => linha( item, i ) }
        />
      </>
  )
}