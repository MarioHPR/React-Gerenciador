import React, { useEffect, useState } from 'react';
import { Header, TableTipoExame } from '../../components';
import { Col, Layout } from 'antd';
import MenuAtual from '../../components/menu';
import ExameApi from '../../models/exameApi';
const { Content, Footer } = Layout;
export default function TipoExame() {
  const [ exames, setExames ] = useState([]);
  const [ atualizaTela, setAtualizaTela ] = useState(0);
  useEffect(()=>{
    const exameApi = new ExameApi();
    exameApi.buscarTodosExames(localStorage.getItem("token-gerenciador-security")).then( resp => { setExames(resp) });
  },[atualizaTela]);

  const [ collapsed2, setCollapsed2 ] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed2(!collapsed2);
  };

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <MenuAtual />
        <Layout className="site-layout">
          <Header className="site-layout-background" collapsed={ collapsed2 } toggleCollapsed={ toggleCollapsed } />
          <Content className="pagina-padrao" style={{ margin: '0 1px' }}>
            <Col xs={{span:24}}>
              <h2 className='titulo-consulta'>Exames cadastrados:</h2>
            </Col>
            <Col xs={{span:24}}>
                {exames !== [] && <TableTipoExame atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela} exames={exames}/>}
            </Col>
          </Content>
          <Footer style={{ textAlign: 'center' }}>GERENCIADOR DE EXAMES© CRIADO POR MARIO HENRIQUE PEREIRA DA ROSA</Footer>
        </Layout>
      </Layout>
    </>
  )
}
