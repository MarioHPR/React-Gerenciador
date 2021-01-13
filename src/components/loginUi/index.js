import React, { useState } from 'react';
import { Button,Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { Link, useHistory } from 'react-router-dom';
import UsuarioApi from '../../models/usuarioApi';

function LoginUi( ) {
  const history = useHistory();
  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');
  const [ deveExibirErro, setDeveExibirErro ] = useState(false);

  async function handleSubmit(event) { 
    event.preventDefault();

    if( email !== '' && senha !== '' ) {
      setDeveExibirErro(false);
      const usuarioApi = new UsuarioApi();
      usuarioApi.realizarLogin(email, senha).then( resposta => {
        if(resposta.status === 200) {
          localStorage.setItem( "token-gerenciador-security", resposta.headers.authorization );
        }
        if(localStorage.getItem("token-gerenciador-security")){
          history.push('/')
        }
      });
    } else {
      setDeveExibirErro(true);
    }
  }

  return (
    <>
      <section className="container-form">
        <h2>Faça seu Login</h2>
        <div>
          <input className="btn-login input-login" onBlur={ evt => setEmail( evt.target.value )} placeholder="email@gmail.com" id="email" type="text" name="email" required />
          <Input.Password
            required
            className="btn-login"
            id="senha" name="senha"
            placeholder="insira sua senha"
            onBlur={ evt => setSenha( evt.target.value )}
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
          { deveExibirErro && <span className="mensagem-erro" >EMAIL E SENHA OBRIGATORIO</span> }
          <Button className="btn-cadastrar fundo-azul" onClick={ handleSubmit } >Entrar</Button>
        </div>
        <Link to='/cadastro' className="btn-cadastrar-usuario">
            Cadastrar
        </Link>
      </section>
    </>
  )
}

export default LoginUi;
