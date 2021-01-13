import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormularioUi, FormularioLocalidadeContato } from '../../components';
import { Row, Col } from 'antd';
import './style.css';

import UsuarioApi from '../../models/usuarioApi';

export default function Cadastro() {
  const history = useHistory();
  const [ nome, setNome ] = useState('');
  const [ cpf, setCpf ] = useState('');
  const [ dataNascimento, setDatanascimento ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');

  const [ cep, setCep ] = useState('');
  const [ bairro, setBairro ] = useState('');
  const [ rua, setRua ] = useState('');
  const [ numero, setNumero ] = useState('');
  const [ cidade, setCidade ] = useState('');

  const [ contatoUm, setContatoUm ] = useState('');
  const [ contatoDois, setContatoDois ] = useState('');

  const formataData = data => {
    let formatData;
    let dataAux = new Date(data.replaceAll('-','/'));
    formatData = "" + dataAux.toISOString();
    formatData = formatData.slice(0,-1);
    return formatData;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    let formatacaoData;
    const usuarioApi = new UsuarioApi();

    if(cep !== '' && bairro !== '' && rua !== '' && numero !== '' &&
       cidade !== '' && contatoUm !== '' && contatoDois !== '' ){
         if( nome !== '' && cpf !== '' && dataNascimento !== '' && email !== '' && senha !== '' ){
          formatacaoData = formataData( dataNascimento );

          usuarioApi.criarUsuario({ nome : nome, cpf : cpf, email : email, dataNasc : formatacaoData, senha : senha })
            .then( resposta => {
              if( resposta.status === 200 ){
                const requisicoes = [
                  usuarioApi.cadastrarLocalidadeUsuario({ email: email, cidade : cidade, cep : cep, bairro : bairro, rua : rua, numero : numero }),
                  usuarioApi.cadastrarContatoUsuario({ email: email, contatoUm : contatoUm, contatoDois : contatoDois })  
                ]
                Promise.all( requisicoes ).then( resp => {
                  if( resp[0].status === 200 && resp[1].status === 200 ){
                    history.push('/login');
                  }
                });
              }
            } );
         }
    }
  }

  return (
    <div className="pagina-padrao tamanho-total-container">
      <h2 className='titulo-principal'>Cadastro Usuário:</h2>
      <Row>
        <Col xs={{span:24}} md={{span:12}}>
          <Col xs={{span:24}}>
            <div className="pagina-login">
              <div className="container-form margin-top container-form-infos">
                 <FormularioLocalidadeContato setCep={ setCep } setBairro={ setBairro } setRua={ setRua }
                                  setNumero={ setNumero } setCidade={ setCidade }
                                  setCampoUm={ setContatoUm } setCampoDois={ setContatoDois } />
              </div>
            </div>
          </Col>
        </Col>
        <Col xs={{span:24}} md={{span:12}}>
          <Col xs={{span:24}}>
            <FormularioUi setNome={ setNome } setCpf={ setCpf } setDatanascimento={ setDatanascimento }
                          setEmail={ setEmail } setSenha={setSenha} />
          </Col>
          <Col xs={{span:24}}>
            <div className="botoes">
              <button className='cadastrar' onClick={ handleSubmit }>Cadastrar</button>
              <Link to='/' className='voltar'>Voltar</Link>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  )
}
