import React from 'react';
import { Input, Form, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './stilo.css';
import '../../pages/login/login.css'
import { Lista } from '../../components';
import InputMask from 'react-input-mask';

export default function FormularioUi() {
  
  const linha = ( item, i ) => {
    return (
      <>
      <label className="cor-branco">{item.titulo}<span className="cor-vermelho">*</span></label>
        <Form.Item name={ item.name }
            rules={ [ { required: true, message: `${ item.titulo } Obrigatório!` } ] }
        >
          { item.mask ?
            <InputMask mask="999.999.999-99" key={ i } className={ item.classe } type={ item.tipo } placeholder={ item.dica } />
            : <input key={ i } className={ item.classe } type={ item.tipo } placeholder={ item.dica } />
          }
        </Form.Item>
      </>
    )
  }

  return (
    <div className="container-form margin-top container-form-infos">
      <h2 className="titulo">Dados pessoais:</h2>
      <Lista
        className="container-inputs"
        dados={[
          { name: 'nome', titulo: 'Nome:', classe: 'input-padrao', tipo:'text', dica: 'Digite seu nome' },
          { name: 'cpf', mask: true, titulo: 'cpf:', classe: 'input-padrao', tipo:'text', dica: 'Digite seu Cpf' },
          { name: 'dataNascimento', titulo: 'Data nascimento:', classe: 'input-padrao', tipo:'date', dica: '01/01/2020' },
          { name: 'email', titulo: 'E-mail:', classe: 'input-padrao', tipo:'text', dica: 'Digite seu email' }
        ] }
        funcao={ ( item, i ) => linha( item, i ) }
      />
      <label className="cor-branco">Senha:<span className="cor-vermelho">*</span></label>
      <Form.Item className="" name={ "senha" } label={ "" }
          rules={ [ { required: true, message: `Senha é Obrigatório!` } ] }
      >
        <Input.Password
          className="input-padrao tag-tamanho-total senha-cadastro-input"     
          id="senha" name="senha"
          placeholder="senha"
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>
      
      <Button type="primary" htmlType="submit" className="botao-proxima-etapa">próxima etapa</Button>
    </div>
  )
}