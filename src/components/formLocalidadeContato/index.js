import React from 'react';
import '../formularioUi/stilo.css';
import '../../pages/login/login.css';
import { Form, Button } from 'antd';
import './style.css';
import { Lista } from '..';
import InputMask from 'react-input-mask';

export default function FormularioLocalidadeContato( props ) {

  const { etapaAnterior } = props;
  const linha = ( item, i ) => {
    return (
      <>
        <label className="cor-branco">{item.titulo}<span className="cor-vermelho">*</span></label>
        <Form.Item className={ "" } name={ item.name } label={ "" }
          rules={ [ { required: true, message: `${ item.titulo } Obrigatório!` } ] }
        >
          { item.mask ?
            <InputMask mask="99999-999" key={ i } className={ item.classe } type={ item.tipo } placeholder={ item.dica } />
            : <input key={ i } className={ item.classe } type={ item.tipo } placeholder={ item.dica } />
          }
        </Form.Item>
        
      </>
    )
  }

  return (
    <React.Fragment>    
          <h2 className="titulo">Localização:</h2>
          <Lista
            className="container-inputs"
            dados={[
              { name: 'cidade', titulo: 'Cidade:', classe: 'input-padrao', tipo:'text', dica: 'Digite sua cidade' },
              { name: 'cep', mask: true, titulo: 'Cep:', classe: 'input-padrao', tipo:'text', dica: 'Digite seu cep' },
              { name: 'bairro', titulo: 'Bairro:', classe: 'input-padrao', tipo:'text', dica: 'Bairro' },
              { name: 'rua', titulo: 'Rua:', classe: 'input-padrao', tipo:'text', dica: 'Sua rua' },
              { name: 'numero', titulo: 'Numero:', classe: 'input-padrao', tipo:'text', dica: 'Numero da sua casa' }
            ] }
            funcao={ ( item, i ) => linha( item, i ) }
          />
          <div className='container-botoes-navegacao'>
            <Button onClick={etapaAnterior} className="botao-etapa-anterior">etapa anterior</Button>
            <Button type="primary" htmlType="submit" className="botao-proxima-etapa">próxima etapa</Button>
          </div>
    </React.Fragment>
  )
}