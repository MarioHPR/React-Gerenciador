import React, { useEffect, useState } from 'react';
import { Header, Footer, TableTipoExame } from '../../components';
import { Row, Col } from 'antd';

import ExameApi from '../../models/exameApi';

export default function Exame() {
  const [ exames, setExames ] = useState([]);
  useEffect(()=>{
    const exameApi = new ExameApi();
    exameApi.buscarExame(localStorage.getItem("token-gerenciador-security")).then( resp => {setExames(resp); console.log(resp) });
  },[setExames]);

  return (
    <div className="pagina-padrao">
      <Header />
      <div className="div-cards" >
        <Row>
          <Col xs={{span:24}}>
            <h2 className='titulo-consulta'>Exames cadastrados:</h2>
          </Col>
          <Col xs={{span:24}}>
              {exames !== [] && <TableTipoExame tipoExame={exames}/>}
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  )
}
