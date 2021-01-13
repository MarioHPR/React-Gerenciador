import React from 'react';
import '../formularioUi/stilo.css';
import '../../pages/login/login.css';
import { Divider } from 'antd';
import './style.css';
import { FormularioContato, Lista } from '..';

export default function FormularioLocalidadeContato( props ) {

  const { setCep, setBairro, setRua, setNumero, setCidade, setCampoUm, setCampoDois } = props;

  const linha = ( item, i ) => {
    return (
      <>
        <label>{item.titulo}</label>
        <input key={ i } className={ item.classe } type={ item.tipo } placeholder={ item.dica } onChange={ evt => item.metodo( evt.target.value ) } />
      </>
    )
  }

  return (
    <React.Fragment>    
          <h2 className="titulo">Localização:</h2>
          <Lista
            className="container-inputs"
            dados={[
              { titulo: 'Cidade:', classe: 'input-padrao', tipo:'text', dica: 'Digite sua cidade', metodo: setCidade  },
              { titulo: 'Cep:', classe: 'input-padrao', tipo:'text', dica: 'Digite seu cep', metodo: setCep  },
              { titulo: 'Bairro:', classe: 'input-padrao', tipo:'text', dica: 'Bairro', metodo: setBairro  },
              { titulo: 'Rua:', classe: 'input-padrao', tipo:'text', dica: 'Sua rua', metodo: setRua  },
              { titulo: 'Numero:', classe: 'input-padrao', tipo:'text', dica: 'Numero da sua casa', metodo: setNumero  }
            ] }
            funcao={ ( item, i ) => linha( item, i ) }
          />
          <Divider className="separador" />
          <FormularioContato setCampoUm={ setCampoUm } setCampoDois={ setCampoDois } /> 
    </React.Fragment>
  )
}