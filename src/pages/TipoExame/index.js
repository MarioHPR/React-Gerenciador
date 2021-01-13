import React, { useEffect, useState } from 'react';
import { Header, Footer, TableTipoExame } from '../../components';
import { Row, Col } from 'antd';

import TipoExameApi from '../../models/tipoExameApi';

export default function TipoExame() {
  const [ tipoExames, setTipoExames ] = useState([]);
  useEffect(()=>{
    const tipoExameApi = new TipoExameApi();
    tipoExameApi.buscarTipoExame(localStorage.getItem("token-gerenciador-security")).then( resp => {setTipoExames(resp); console.log(resp) });
  },[setTipoExames]);

  return (
    <div className="pagina-padrao">
      <Header />
      <div className="div-cards" >
        <Row>
          <Col xs={{span:24}}>
            <h2 className='titulo-consulta'>Tipos de exames cadastrados:</h2>
          </Col>
          <Col xs={{span:24}}>
              {tipoExames !== [] && <TableTipoExame tipoExame={tipoExames}/>}
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  )
}
