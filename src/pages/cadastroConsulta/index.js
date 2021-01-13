import React, { useEffect, useState } from 'react';
import { Header, FormularioConsulta, Footer, TableDados } from '../../components';
import { Row, Col } from 'antd';

import ConsultaApi from '../../models/consultaApi';

export default function ConsultaConsulta() {
  const [ consultas, setConsultas ] = useState([]);
  useEffect(()=>{
    const consultaApi = new ConsultaApi();
    consultaApi.buscarConsultas(localStorage.getItem("token-gerenciador-security")).then( resp => setConsultas(resp) );
  },[]);

  return (
    <div className="pagina-padrao">
      <Header />
      <div className="div-cards" >
        <Row>
          <Col xs={{span:24}}>
            <h2 className='titulo-consulta'>Consultas:</h2>
          </Col>
          {
          <Col xs={{span:24}}>
            <FormularioConsulta />
          </Col>
          }
        </Row>
      </div>
      <Footer />
    </div>
  )
}
