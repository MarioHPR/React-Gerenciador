import React, { useState } from 'react';
import { Layout, Row} from 'antd';
import { Header, LoginUi }  from '../../components';
import './login.css';
import { Col } from 'antd';

const { Content, Footer } = Layout;
export default function Login() {
  const [flg, setFlg ] = useState(true);
  const [ collapsed2, setCollapsed2 ] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed2(!collapsed2);
  };

  const mostrarLogin = () => {
    console.log("entroudadasda")
    let aux = !flg;
    setFlg(aux);
  }
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Header className="site-layout-background" collapsed={ collapsed2 } toggleCollapsed={ toggleCollapsed } mostrarLogin={mostrarLogin} btMostrarLogin={true} />
        <Content className="pagina-padrao" style={{ margin: '0 1px' }}>
          <Row>
            <Col ms={{span:24}} md={{span:17}}>
              <h3>Porque utilizar o gerenciador de exames?</h3>
              <p>Nosso sistema ajudará você a manter seus exames e consultas organizadas em um só lugar.</p>
              <p>Nosso sistema tem como objetivo disponibilizar uma alternativa para você organizar seus arquivos de midia digital e fisica de forma     totalmente digital.</p>
              <p>Disponibilizando acesso de qualquer lugar para você, seja em sua casa, consultório, hospital entre outros lugares.</p>
              <p>Com nosso sistema você levará sempre todos os seus exames e consultas cadastradas, facilitando o acompanhamento médico e até mesmo ajudando você a ter um controle sobre seus dados de saúde.</p>
            </Col>
            <Col ms={{span:24}} md={ { span: 7 } }>
              <div className="login" hidden={flg ? true : false}>
                <div className="layout-login">
                  <LoginUi />
                </div>
              </div>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>GERENCIADOR DE EXAMES© CRIADO POR MARIO HENRIQUE PEREIRA DA ROSA</Footer>
      </Layout>
    </Layout>
  );
    
}