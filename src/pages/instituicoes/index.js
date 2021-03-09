import React, { useEffect, useState } from 'react';
import { Header, Footer, TableInstituicaoDados } from '../../components';
import { Row, Col } from 'antd';
//import './style.css';

import InstituicaoApi from '../../models/instituicaoApi';

export default function Instituicoes() {
  const [ instituicoes, setInstituicoes ] = useState([]);
  const [ atualizaTela, setAtualizaTela ] = useState(0);
  const [ message, setMessage ] = useState('');
  const instituicaoApi = new InstituicaoApi();
  const auth = localStorage.getItem("token-gerenciador-security");
  const [ aux, setAux ] = useState([]);

  useEffect(()=>{
    instituicaoApi.buscarInstituicoes(auth)
      .then( resp => setInstituicoes(resp) );
  },[setInstituicoes, atualizaTela]);


  const handleDelete = evt => {
    instituicaoApi.deletarInstituicao(evt, auth).then( resp => {
      if( resp.status === 200 ){
        setMessage(resp.data);
        setAux(aux.filter( (item) => item.key !== evt ) );
        setTimeout(() => {
          setMessage('');
        }, 2 * 1000 );
      }
    } );
  };
console.log(instituicoes)
  return (
    <>
      <Header />
      <div className="div-cards" >
        <Row>
          <Col xs={{span:24}}>
            <h2 className='titulo-consulta'>Instituições:</h2>
          </Col>
          <Col xs={{span:24}}>
              {instituicoes !== [] && <TableInstituicaoDados aux={aux} setAux={setAux} message={message} handleDelete={handleDelete}  atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela} instituicoes={instituicoes}/>}
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  )
}
