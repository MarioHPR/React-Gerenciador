import React, { useEffect, useState } from 'react';
import { Header, Footer, TableTipoExame } from '../../components';
import { Row, Col } from 'antd';

import ExameApi from '../../models/exameApi';

export default function TipoExame() {
  const [ exames, setExames ] = useState([]);
  const [ atualizaTela, setAtualizaTela ] = useState(0);
  useEffect(()=>{
    const exameApi = new ExameApi();
    exameApi.buscarTodosExames(localStorage.getItem("token-gerenciador-security")).then( resp => { setExames(resp) });
  },[atualizaTela]);

  return (
    <div className="pagina-padrao">
      <Header />
      <div className="div-cards" >
        <Row>
          <Col xs={{span:24}}>
            <h2 className='titulo-consulta'>Exames cadastrados:</h2>
          </Col>
          <Col xs={{span:24}}>
              {exames !== [] && <TableTipoExame atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela} exames={exames}/>}
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  )
}
