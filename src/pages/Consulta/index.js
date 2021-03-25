import React, { useEffect, useState } from 'react';
import { Header, TableDados } from '../../components';
import { Col, Layout } from 'antd';
import './style.css';
import MenuAtual from '../../components/menu';
import ConsultaApi from '../../models/consultaApi';

const { Content, Footer } = Layout;

export default function Consulta() {
  const [ consultas, setConsultas ] = useState([]);
  const [ atualizaTela, setAtualizaTela ] = useState(0);

  const [ collapsed2, setCollapsed2 ] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed2(!collapsed2);
  };

  useEffect(()=>{
    const consultaApi = new ConsultaApi();
    consultaApi.buscarConsultas(localStorage.getItem("token-gerenciador-security")).then( resp => setConsultas(resp) );
  },[setConsultas, atualizaTela]);

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <MenuAtual />
        <Layout className="site-layout">
          <Header className="site-layout-background" collapsed={ collapsed2 } toggleCollapsed={ toggleCollapsed } />
          <Content className="pagina-padrao" style={{ margin: '0 1px' }}>
            <Col xs={{span:24}}>
              <h2 className='titulo-consulta'>Consultas:</h2>
            </Col>
            <Col xs={{span:24}}>
                {consultas !== [] && <TableDados  atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela} consultas={consultas}/>}
            </Col>
          </Content>
          <Footer style={{ textAlign: 'center' }}>GERENCIADOR DE EXAMES© CRIADO POR MARIO HENRIQUE PEREIRA DA ROSA</Footer>
        </Layout>
      </Layout>
    </>
  )
}
