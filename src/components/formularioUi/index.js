import React from 'react';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './stilo.css';
import '../../pages/login/login.css'
import { Lista } from '../../components';

export default function FormularioUi( props ) {
  
  const { setNome, setCpf, setDatanascimento, setEmail, setSenha, setPermissao } = props;

  const linha = ( item, i ) => {
    return (
      <>
        <label>{item.titulo}</label>
        <input key={ i } className={ item.classe } type={ item.tipo } placeholder={ item.dica } onChange={ evt => item.metodo( evt.target.value ) } />
      </>
    )
  }

  return (
    <div className="container-form margin-top container-form-infos">
      <h2 className="titulo">Dados pessoais:</h2>
      <Lista
        className="container-inputs"
        dados={[
          { titulo: 'Nome:', classe: 'input-padrao tag-tamanho-total', tipo:'text', dica: 'Digite seu nome', metodo: setNome  },
          { titulo: 'cpf:', classe: 'input-padrao tag-tamanho-total', tipo:'text', dica: 'Digite seu Cpf', metodo: setCpf  },
          { titulo: 'Data nascimento:', classe: 'input-padrao tag-tamanho-total', tipo:'date', dica: '01/01/2020', metodo: setDatanascimento  },
          { titulo: 'E-mail:.', classe: 'input-padrao tag-tamanho-total', tipo:'text', dica: 'Digite seu email', metodo: setEmail  }
        ] }
        funcao={ ( item, i ) => linha( item, i ) }
      />
      <label>Senha:</label>
      <Input.Password
        className="input-padrao tag-tamanho-total senha-cadastro-input"
        onBlur={ evt => setSenha( evt.target.value ) }
        id="senha" name="senha"
        placeholder="senha"
        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />  
    </div>
  )
}