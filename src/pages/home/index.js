import { Layout} from 'antd';
import React, { useState } from 'react';
import { Header } from '../../components';
import MenuAtual from '../../components/menu';

const { Content, Footer } = Layout;

export default function Home() {
  const [ collapsed2, setCollapsed2 ] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed2(!collapsed2);
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MenuAtual />
      <Layout className="site-layout">
        <Header className="site-layout-background" collapsed={ collapsed2 } toggleCollapsed={ toggleCollapsed } />
        <Content className="pagina-padrao" style={{ margin: '0 1px' }}>
          <h1>Home</h1>
        </Content>
        <Footer style={{ textAlign: 'center' }}>GERENCIADOR DE EXAMES© CRIADO POR MARIO HENRIQUE PEREIRA DA ROSA</Footer>
      </Layout>
    </Layout>
  );
}