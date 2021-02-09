import React from 'react';
import '../../pages/login/login.css';
import { Lista } from '../../components';
import {  Form } from 'antd';

export default function FormularioContato() {

  const linha = ( item, i ) => {
    return (
      <>
        <label className="cor-branco">Contato {i+1}:<span className="cor-vermelho">*</span></label>
        <Form.Item className="" name={ `contato${i+1}` } label={ "" }
          rules={ [ { required: true, message: `Senha é Obrigatório!` } ] }
        >
          <input key={ i } className={ item.classe } type={ item.tipo } placeholder="Insira seu email ou telefone" />
        </Form.Item>
      </>
    )
  }

  return (
      <>
        <h2 className="titulo">Contato:</h2>
        <Lista
          className="container-inputs"
          dados={[
            { titulo: 'Tipo:', classe: 'input-padrao tag-tamanho-total', tipo:'text', dica: '' },
            { titulo: 'Valor:', classe: 'input-padrao tag-tamanho-total', tipo:'text', dica: '' },
          ] }
          funcao={ ( item, i ) => linha( item, i ) }
        />
      </>
  )
}