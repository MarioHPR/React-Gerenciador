import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Header, Footer, FormularioLocalidadeContato } from '../../components';
import { Row, Col } from 'antd';
import './style.css';

import InstituicaoApi from '../../models/instituicaoApi';
import ContatoApi from '../../models/contatoApi';
import LocalidadeApi from '../../models/localidadeApi';
import { Repeat } from '@material-ui/icons';

export default function CadastroInsituicao() {
  const history = useHistory();

  const [ nomeInstituicao, setNomeInstituicao ] = useState('');
  const [ cep, setCep ] = useState('');
  const [ bairro, setBairro ] = useState('');
  const [ rua, setRua ] = useState('');
  const [ numero, setNumero ] = useState('');
  const [ cidade, setCidade ] = useState('');

  const [ contatoUm, setContatoUm ] = useState('');
  const [ contatoDois, setContatoDois ] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const auth = localStorage.getItem("token-gerenciador-security");
    let formatacaoData;
    const instituicaoApi = new InstituicaoApi();
    const contatoApi = new ContatoApi();
    const localidadeApi = new LocalidadeApi();

    if(cep !== '' && bairro !== '' && rua !== '' && numero !== '' && cidade !== '' && contatoUm !== '' && contatoDois !== '' && nomeInstituicao !== '' ){
      const email = "";
      const requisicoes = [
      contatoApi.criarContato( { contatoUm : contatoUm, contatoDois : contatoDois }, auth ),
      localidadeApi.criarLocalidade2( { cidade : cidade, cep : cep, bairro : bairro, rua : rua, numero : numero }, auth )
      ];

      Promise.all( requisicoes ).then( resp => {
        if( resp[0].status === 200 && resp[1].status === 200 ){
          instituicaoApi.criarInstituicao({ nomeInstituicao : nomeInstituicao, idContato : resp[0].data.id, idLocalidade : resp[1].data.id }, auth).then( resposta => {
            if(resposta.status === 200)
              history.push('/cadastroConsulta');
          } )
        }
      });
         
    }
  }

  return (
    <>
    
    <div className="pagina-padrao">
    <Header  />
      <h2 className='titulo-principal'>Cadastro Instituicao:</h2>
      <Row> 
        <Col  xs={{span:24}}>
          <div className="container-corpo">
            <div className="container-form margin-top form-instituicao">
              <label>Nome Instituição:</label>
              <input className="input-nome" type='text' placeholder='Nome instituição' onChange={evt => setNomeInstituicao( evt.target.value )}/>
              <FormularioLocalidadeContato setCep={ setCep } setBairro={ setBairro } setRua={ setRua }
                                            setNumero={ setNumero } setCidade={ setCidade }
                                            setCampoUm={ setContatoUm } setCampoDois={ setContatoDois } />
              <div className="botoes-form">
                <button className='cadastrar' onClick={ handleSubmit }>Cadastrar</button>
                <Link to='/cadastroConsulta' className='voltar'>Voltar</Link>
              </div>
            </div>
          </div>
        </Col>    
      </Row>
      <Footer />
    </div>
    
    </>
  )
}
