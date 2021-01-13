import React, { useEffect, useState } from 'react';
import { Header, Footer, TableDados } from '../../components';
import { Row, Col } from 'antd';
import './style.css';

import ConsultaApi from '../../models/consultaApi';

export default function Consulta() {
  const [ consultas, setConsultas ] = useState([]);
  useEffect(()=>{
    const consultaApi = new ConsultaApi();
    consultaApi.buscarConsultas(localStorage.getItem("token-gerenciador-security")).then( resp => setConsultas(resp) );
  },[setConsultas]);

  return (
    <div className="pagina-padrao">
      <Header />
      <div className="div-cards" >
        <Row>
          <Col xs={{span:24}}>
            <h2 className='titulo-consulta'>Consultas:</h2>
          </Col>
          <Col xs={{span:24}}>
              {consultas !== [] && <TableDados consultas={consultas}/>}
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  )
}
