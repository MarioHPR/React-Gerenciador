import React, { useEffect, useState } from 'react';
import { Header, Footer, TableListaTipoExame } from '../../components';
import { Row, Col } from 'antd';
//import './style.css';

import TipoExameApi from '../../models/tipoExameApi';
const tipoExameApi = new TipoExameApi();
const auth = localStorage.getItem("token-gerenciador-security");

export default function ListaTipoExames() {
  const [ tipoExames, setTipoExames ] = useState([]);
  const [ atualizaTela, setAtualizaTela ] = useState(0);
  const [ message, setMessage ] = useState('');
  

  const [ aux, setAux ] = useState([]);

  useEffect(()=>{
    tipoExameApi.buscarTodosTipoExames(auth)
      .then( resp => {
        console.log(resp)
        setTipoExames(resp)
      } );
  },[atualizaTela]);


  const handleDelete = evt => {
    // tipoExameApi.deletarInstituicao(evt, auth).then( resp => {
    //   if( resp.status === 200 ){
    //     setMessage(resp.data);
    //     setAux(aux.filter( (item) => item.key !== evt ) );
    //     setTimeout(() => {
    //       setMessage('');
    //     }, 2 * 1000 );
    //   }
    // } );
  };
  return (
    <>
      <Header />
      <div className="div-cards" >
        <Row>
          <Col xs={{span:24}}>
            <h2 className='titulo-consulta'>Listagem tipo exames:</h2>
          </Col>
          <Col xs={{span:24}}>
              {tipoExames !== [] && <TableListaTipoExame aux={aux} setAux={setAux} message={message} handleDelete={handleDelete}  atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela} tipoExames={tipoExames}/>}
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  )
}
