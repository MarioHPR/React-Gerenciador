import { Layout, Menu, Divider} from 'antd';
import {
  PieChartOutlined,
  FileOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Component } from 'react';

const { Header, Content, Footer, Sider } = Layout;

export default function LayoutInterno() {
    const [ collapsed, setCollapsed ] = useState();

    const onCollapse = collapsed => {
        setCollapsed( collapsed );
    };

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Gerenciador
            </Menu.Item>
            <Divider />
            <Menu.Item key="9" icon={<FileOutlined />}>
                <Link className='' to='/'>Home</Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<FileOutlined />}>
                <Link className='' to='/tipoExames'>Exame</Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<FileOutlined />}>
                <Link className='' to='/consultas'>Consulta</Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<FileOutlined />}>
                <Link className='' to='/instituicoes'>Instituições</Link>
            </Menu.Item>      
            <Menu.Item key="9" icon={<FileOutlined />}>
                <Link className='' to='/listaTipoExames'>Tipo de exames</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            {/* <Conteudo /> */}
          </Content>
          <Footer style={{ textAlign: 'center' }}>GERENCIADOR DE EXAMES© CRIADO POR MARIO HENRIQUE PEREIRA DA ROSA</Footer>
        </Layout>
      </Layout>
    );
}